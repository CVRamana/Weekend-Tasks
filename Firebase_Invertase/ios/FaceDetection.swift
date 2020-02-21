

import Foundation
import UIKit
import Firebase
import Vision

@available(iOS 11.0, *)
@available(iOS 11.0, *)
@available(iOS 11.0, *)

@objc(FaceDetection)

class FaceDetection:NSObject{
  var text:String="Hey, what's up !"
  var image:UIImage!
  var posX:CGFloat!
  var posY:CGFloat!
  var ht:CGFloat!
  var wh:CGFloat!
  //var croppedImg:String!
  var croppedPaths:[String]=[]
  lazy var vision = Vision.vision()
  
  //for converting the image path from the react native to UIImage in IOS
  func convert(path:String){
    let url11 = URL(fileURLWithPath: path)
    DispatchQueue.global().async {
      if let data = try? Data( contentsOf:url11)
      {
        DispatchQueue.main.async {
          self.image = UIImage( data:data)
        }
      }
    }
  }
  
  @objc
  func getMlKit(_ fileUrl:String,secondArg:Int,callback: @escaping RCTResponseSenderBlock)->Void{
    self.convert(path: fileUrl)

    switch(secondArg){
    case 1:
      self.detectText()
      break;
    case 2:
      let delayTime = DispatchTime.now() + 1.0
      DispatchQueue.main.asyncAfter(deadline: delayTime, execute: {
       self.detectFace()
      })
//      self.detectFace()
      break
    case 3:
      DispatchQueue.global(qos: .background).async{
        //time consuming task on the background //threads
       self.labelImage()
      }
      break
    case 4:
      DispatchQueue.global(qos: .background).async{
        //time consuming task on the background //threads
        self.detectNdTrackObjects()
      }
      break
    case 5:
      self.scanBarCode()
//    case 6:
//      self.deleteFolder()
//      break
    default:
      return
    }
    let delayTime = DispatchTime.now() + 3.0
    DispatchQueue.main.asyncAfter(deadline: delayTime, execute: {
     callback([self.croppedPaths])
    })
    
  }

  //face Detection
  
  func detectFace(){
    // High-accuracy landmark detection and face classification
    let options = VisionFaceDetectorOptions()
    options.performanceMode = .accurate
    options.landmarkMode = .all
    options.classificationMode = .all
    
    // Real-time contour detection of multiple faces
    
    let faceDetector = vision.faceDetector(options: options)
    guard  self.image != nil else{
      print(" UI Image is converting ")
      return
    }
    
    let image11 = VisionImage(image: self.image)
    
    faceDetector.process(image11) { faces, error in
      guard error == nil, let faces = faces, !faces.isEmpty else {
        // ...
        return

      }
      
      // ....
      for face in faces {
        let frame = face.frame
//        self.posX=frame.maxX
//        self.posY=frame.maxY
//        self.ht=frame.height-self.posX
//        self.wh=frame.width-self.posY
        
        self.cropping(to: frame)
        
        print("Frame coordinates are as follows : :",self.posX , self.posY, self.ht, self.wh)
        if face.hasHeadEulerAngleY {
          let rotY = face.headEulerAngleY  // Head is rotated to the right rotY degrees
        }
        if face.hasHeadEulerAngleZ {
          let rotZ = face.headEulerAngleZ  // Head is rotated upward rotZ degrees
        }
        
        // If landmark detection was enabled (mouth, ears, eyes, cheeks, and
        // nose available):
        
        if let leftEye = face.landmark(ofType: .leftEye) {
          let leftEyePosition = leftEye.position
          print("path from the React Native: => ",leftEyePosition)
        }
        
        // If contour detection was enabled:
        
        if let leftEyeContour = face.contour(ofType: .leftEye) {
          let leftEyePoints = leftEyeContour.points
        }
        if let upperLipBottomContour = face.contour(ofType: .upperLipBottom) {
          let upperLipBottomPoints = upperLipBottomContour.points
        }
        
        // If classification was enabled:
        
        if face.hasSmilingProbability {
          let smileProb = face.smilingProbability
        }
        if face.hasRightEyeOpenProbability {
          let rightEyeOpenProb = face.rightEyeOpenProbability
        }
        
        // If face tracking was enabled:
        
        if face.hasTrackingID {
          let trackingId = face.trackingID
        }
        
      }
    }
  }
  //text Recognition
  func detectText(){
    let textRecognizer = vision.onDeviceTextRecognizer()
    let image22 = VisionImage(image: self.image)
    textRecognizer.process(image22) { result, error in
      guard error == nil, let result = result else {
        // ...
        return
      }
      
      // Recognized text
      let resultText = result.text
      print("recognised text",resultText)
      for block in result.blocks {
        let blockText = block.text
        let blockConfidence = block.confidence
        let blockLanguages = block.recognizedLanguages
        let blockCornerPoints = block.cornerPoints
        let blockFrame = block.frame
        for line in block.lines {
          let lineText = line.text
          let lineConfidence = line.confidence
          let lineLanguages = line.recognizedLanguages
          let lineCornerPoints = line.cornerPoints
          let lineFrame = line.frame
          for element in line.elements {
            let elementText = element.text
            print("here text goes: ",elementText)
            let elementConfidence = element.confidence
            let elementLanguages = element.recognizedLanguages
            let elementCornerPoints = element.cornerPoints
            _ = element.frame
          }
        }
      }
    }
    //print("")
  }
  
  //label image
  func labelImage(){
    let image3 = VisionImage(image: self.image)
    let labeler = Vision.vision().onDeviceImageLabeler()
    labeler.process(image3) { labels, error in
      guard error == nil, let labels = labels else { return }
      
      // Task succeeded.
      // ...
      for label in labels {
        let labelText = label.text
        let entityId = label.entityID
        let confidence = label.confidence
        print("labels: ",labelText,entityId,confidence)
      }
    }
  }
  //Detect and track Objects
  func detectNdTrackObjects(){
//    let options = VisionObjectDetectorOptions()
//    options.detectorMode = .stream
//    options.shouldEnableMultipleObjects = false
//    options.shouldEnableClassification = true  // Optional
    
    // Multiple object detection in static images
    let options = VisionObjectDetectorOptions()
    options.detectorMode = .singleImage
    options.shouldEnableMultipleObjects = false
    options.shouldEnableClassification = true  // Optional
    
   // let objectDetector = Vision.vision().objectDetector()
    
    // Or, to change the default settings:
    let objectDetector = Vision.vision().objectDetector(options: options)
    let image4 = VisionImage(image: self.image)
    
    objectDetector.process(image4) { detectedObjects, error in
      guard error == nil else {
        // Error.
        return
      }
      guard let detectedObjects = detectedObjects, !detectedObjects.isEmpty else {
        // No objects detected.
        return
      }
      
      // Success. Get object info here.
      // ...
      var results: [VisionObject]? = nil
      do {
        results = try objectDetector.results(in: image4)
        print(results)
      } catch let error {
        print("Failed to detect object with error: \(error.localizedDescription).")
        return
      }
    }
  }
  
  //scan the bar code
  
  func scanBarCode(){
    let format = VisionBarcodeFormat.all
    let barcodeOptions = VisionBarcodeDetectorOptions(formats: format)
    let barcodeDetector = vision.barcodeDetector(options: barcodeOptions)
    let image5 = VisionImage(image: self.image)
    barcodeDetector.detect(in: image5) { features, error in
      guard error == nil, let features = features, !features.isEmpty else {
        // ...
        return
      }
      //results
      // ...
      for barcode in features {
        let corners = barcode.cornerPoints
        
        let displayValue = barcode.displayValue
        let rawValue = barcode.rawValue
        print("raw value is : ",rawValue)
        let valueType = barcode.valueType
        switch valueType {
        case .wiFi:
          let ssid = barcode.wifi!.ssid
          let password = barcode.wifi!.password
          let encryptionType = barcode.wifi!.type
        case .URL:
          let title = barcode.url!.title
          let url = barcode.url!.url
        default: break
          // See API reference for all supported value types
        }
      }
    }
  }
  
  //crop the image
  func cropping(to rect :CGRect){
    guard let cutImageRef: CGImage = self.image.cgImage?.cropping(to:rect)
      else {
        print("nill found")
        return
    }
    
    // Return image to UIImage
    let croppedImage: UIImage = UIImage(cgImage: cutImageRef)
    let path=self.saveImageToDocumentDirectory(croppedImage)
//    if let path=path else{
//      print("nil found")
//    }
    self.croppedPaths.append(path)
  //  return croppedImage
    
  }
 
  //to save the image
  func saveImageToDocumentDirectory(_ chosenImage: UIImage) -> String {
    let fileName = UUID().uuidString+".JPG";
    let documentsURL = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
    let folderURL = documentsURL.appendingPathComponent("SaveFillterImage")
    if !FileManager.default.fileExists(atPath: folderURL.path) {
      do {
        try FileManager.default.createDirectory(atPath: folderURL.path, withIntermediateDirectories: true, attributes: nil)
      }
      catch {}
    }
    let fileURL = folderURL.appendingPathComponent(fileName)
    let data =  chosenImage.jpegData(compressionQuality: 0.75)
    do {
      try data!.write(to: fileURL)
      
      return fileURL.absoluteString
    }
    catch {}
    
    return fileURL.absoluteString
  }
  
  // for deleting the Folder
  @objc
  func deleteFolder (_ callback: RCTResponseSenderBlock) -> Void{
    do {
      let filterFolder =  FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!.appendingPathComponent("SaveFillterImage")
      
      let fileURLs = try FileManager.default.contentsOfDirectory(at: filterFolder,
                                                                 includingPropertiesForKeys: nil,
                                                                 options: [.skipsHiddenFiles, .skipsSubdirectoryDescendants])
      var str=""
      for fileURL in fileURLs {
        print("Removed filtered images \(fileURL)")
        str=fileURL.relativeString
        self.croppedPaths=self.croppedPaths.filter{ $0 != str }
        print("after delete, ",str)
        try FileManager.default.removeItem(at: fileURL)
      }
    }
    catch {
      print(error)
    }
      callback(["suucessfully deleted"])
  }

  
}
