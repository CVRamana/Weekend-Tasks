
import Foundation
import UIKit
import CoreImage 
@objc(ImgFilter)
class ImgFilter: NSObject
{
  
let context = CIContext()
  
  //let originalCIImage = CIImage(contentsOf: URL(fileURLWithPath: (Bundle.main.path(forResource: "12WelcomeScreen1", ofType: "png") ?? "")))

  
  @objc
  func fun_withArg(_ fileUrl:String,callback: RCTResponseSenderBlock)->Void{
  
    let url11 = URL(fileURLWithPath: fileUrl)
    let ci = CIImage(contentsOf: url11)
  
    let path22 = self.sepiaFilter(ci!, intensity: 4.5)
   
    callback([path22])
  }
  
  @objc
  func myFun(){
  // self.sepiaFilter(originalCIImage!, intensity: 3.3)

  }
  
  //filtering
  func sepiaFilter(_ input: CIImage, intensity: Double)
    -> String?
  {
    let sepiaFilter = CIFilter(name:"CISepiaTone")
    sepiaFilter?.setValue(input, forKey: kCIInputImageKey)
    sepiaFilter?.setValue(intensity, forKey: kCIInputIntensityKey)
    print("output\n",sepiaFilter?.outputImage!)
    
   let uiImg = self.convert(cmage: (sepiaFilter?.outputImage)!)
    print("UIImageghdhg :",uiImg)

    
  let savedPath = self.saveImageToDocumentDirectory(uiImg)
    print("saved Path :\n",savedPath)
   // print("file name :" ,filename)
    
   return savedPath
}
  

  
  
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

  //CIImage to UI Image
  func convert(cmage:CIImage) -> UIImage
  {
    let context:CIContext = CIContext.init(options: nil)
    let cgImage:CGImage = context.createCGImage(cmage, from: cmage.extent)!
    let image:UIImage = UIImage.init(cgImage: cgImage)
    return image
  }
}

