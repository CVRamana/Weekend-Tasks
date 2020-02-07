
import Foundation
import UIKit
import CoreImage
import AVFoundation

@objc(ImageFilter_Reboot)
class ImageFilter_Reboot: NSObject {
  
  var callBackURL:String?
  var returnAbleImage :UIImage?
  var FillterType:Int?
  
  @objc
  func deleteFolder (_ fileUrl: String) -> Void{
    do {
      let filterFolder =  FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!.appendingPathComponent("SaveFillterImage")
      
      let fileURLs = try FileManager.default.contentsOfDirectory(at: filterFolder,
                                                                 includingPropertiesForKeys: nil,
                                                                 options: [.skipsHiddenFiles, .skipsSubdirectoryDescendants])
      for fileURL in fileURLs {
        print("Removed filtered images \(fileURL)")
        try FileManager.default.removeItem(at: fileURL)
      }
    } catch  {
      print(error)
    }
  }
  
  /// for instaLogOut
  
  @objc
  func DeleteCoockiesForInstaLogout() -> Void {
    let cookie = HTTPCookie.self
    let cookieJar = HTTPCookieStorage.shared
    for cookie in cookieJar.cookies! {
      cookieJar.deleteCookie(cookie)
    }
  }
  
  
  @objc func download(_ fileUrl: String,fillterType:Int,callback: @escaping RCTResponseSenderBlock) -> Void{
    self.FillterType = fillterType
    switch  self.FillterType {
    case 0:
      load(fileName: fileUrl,completion:{ result in
        let coreImage = CIImage(image: result)
        self.returnAbleImage = CIFilter.additionCompositing(inputImage: coreImage!)
        self.callBackURL = self.save(image:self.returnAbleImage!)
        print(self.callBackURL!)
      })
      break;
      
    case 1:
      load(fileName: fileUrl,completion:{ result in
        let coreImage = CIImage(image: result)
        self.returnAbleImage = CIFilter.ChromeFillter(inputImage: coreImage!)
        self.callBackURL = self.save(image:self.returnAbleImage!)
        print(self.callBackURL!)
        
      })
      break;
      
      
    case 2:
      load(fileName: fileUrl,completion:{ result in
        let coreImage = CIImage(image: result)
        self.returnAbleImage = CIFilter.CIPhotoEffectFade(inputImage: coreImage!)
        self.callBackURL = self.save(image:self.returnAbleImage!)
        print(self.callBackURL!)
      })
      
      break;
      
    case 3:
      load(fileName: fileUrl,completion:{ result in
        let coreImage = CIImage(image: result)
        self.returnAbleImage = CIFilter.CIPhotoEffectInstant(inputImage: coreImage!)
        self.callBackURL = self.save(image:self.returnAbleImage!)
        print(self.callBackURL!)
        
      })
      break;
      
    case 4:
      load(fileName: fileUrl,completion:{ result in
        let coreImage = CIImage(image: result)
        self.returnAbleImage = CIFilter.CIPhotoEffectMono(inputImage: coreImage!)
        self.callBackURL = self.save(image:self.returnAbleImage!)
        print(self.callBackURL!)
      })
      break;
      
    case 5:
      load(fileName: fileUrl,completion:{ result in
        let coreImage = CIImage(image: result)
        self.returnAbleImage = CIFilter.CIPhotoEffectNoir(inputImage: coreImage!)
        self.callBackURL = self.save(image:self.returnAbleImage!)
        print(self.callBackURL!)
      })
      break;
      
    case 6:
      load(fileName: fileUrl,completion:{ result in
        let coreImage = CIImage(image: result)
        self.returnAbleImage = CIFilter.CIPhotoEffectProcess(inputImage: coreImage!)
        self.callBackURL = self.save(image:self.returnAbleImage!)
        print(self.callBackURL!)
      })
      break;
      
    case 7:
      load(fileName: fileUrl,completion:{ result in
        let coreImage = CIImage(image: result)
        self.returnAbleImage = CIFilter.CIPhotoEffectTonal(inputImage: coreImage!)
        self.callBackURL = self.save(image:self.returnAbleImage!)
        print(self.callBackURL!)
      })
      break;
      
    case 8:
      load(fileName: fileUrl,completion:{ result in
        let coreImage = CIImage(image: result)
        self.returnAbleImage = CIFilter.CIPhotoEffectTransfer(inputImage: coreImage!)
        self.callBackURL = self.save(image:self.returnAbleImage!)
        print(self.callBackURL!)
      })
      break;
      
      
    default:
      print("Some other character")
    }
    
    
    
    let seconds = 0.1;
    DispatchQueue.main.asyncAfter(deadline: .now() + seconds) {
      callback([self.callBackURL!])
    }
    
    
  }
  
  private func save(image: UIImage) -> String? {
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
    let data =  image.jpegData(compressionQuality: 0.75)
    do {
      try data!.write(to: fileURL)
      
      return fileURL.absoluteString
    }
    catch {}
    
    return fileURL.absoluteString
  }
  
  public func load(fileName: String, completion: @escaping (UIImage)->()) {
    DispatchQueue.global(qos: .background).async {
      do {
        let data = try Data.init(contentsOf: URL.init(string:fileName)!)
        DispatchQueue.main.async {
          completion(UIImage(data: data)!)
        }
      }
      catch {
        print("Not able to load image")
        
      }
      
    }
    
  }
}

//MARK:- CIMAGE DELEGATES
//=======================


extension CIFilter {
  
  @available(iOS 5, *)
  static func additionCompositing(inputImage: CIImage) -> UIImage? {
    
    guard let filter = CIFilter(name: "CISepiaTone") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
    
  }
  
  
  static func ChromeFillter(inputImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIPhotoEffectChrome") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  static func CIPhotoEffectFade(inputImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIPhotoEffectFade") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  @available(iOS 5, *)
  static func CIPhotoEffectInstant(inputImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIPhotoEffectInstant") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  @available(iOS 5, *)
  static func CIPhotoEffectMono(inputImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIPhotoEffectMono") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  @available(iOS 5, *)
  static func CIPhotoEffectNoir(inputImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIColorInvert") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  @available(iOS 5, *)
  static func CIPhotoEffectProcess(inputImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIColorMonochrome") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  @available(iOS 9, *)
  static func CIPhotoEffectTonal(inputImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIPhotoEffectTonal") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  static func CIPhotoEffectTransfer(inputImage: CIImage) -> UIImage? {
    
    guard let filter = CIFilter(name: "CIPhotoEffectTransfer") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  @available(iOS 5, *)
  static func constantColorGenerator(inputColor: CIColor) -> UIImage? {
    guard let filter = CIFilter(name: "CIConstantColorGenerator") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputColor, forKey: kCIInputColorKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  @available(iOS 7, *)
  static func convolution3X3(inputImage: CIImage, inputWeights: CIVector = CIVector(), inputBias: NSNumber = 0) -> UIImage? {
    guard let filter = CIFilter(name: "CIConvolution3X3") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputWeights, forKey: kCIInputWeightsKey)
    filter.setValue(inputBias, forKey: kCIInputBiasKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  static func crystallize(inputImage: CIImage, inputRadius: NSNumber = 20, inputCenter: CIVector = CIVector(x: 150.0, y: 150.0)) -> UIImage? {
    guard let filter = CIFilter(name: "CICrystallize") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputRadius, forKey: kCIInputRadiusKey)
    filter.setValue(inputCenter, forKey: kCIInputCenterKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  /// [CIDarkenBlendMode](http://developer.apple.com/library/ios/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html#//apple_ref/doc/filter/ci/CIDarkenBlendMode)
  ///
  /// - parameter inputImage: The image to use as an input image. For filters that also use a background image, this is the foreground image.
  /// - parameter inputBackgroundImage: The image to use as a background image.
  ///
  /// - returns: Generated CIFilter (you can get result with ["outputImage"])
  @available(iOS 5, *)
  static func darkenBlendMode(inputImage: CIImage, inputBackgroundImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIDarkenBlendMode") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputBackgroundImage, forKey: kCIInputBackgroundImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  @available(iOS 11, *)
  static func depthToDisparity(inputImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIDepthToDisparity") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  @available(iOS 5, *)
  static func differenceBlendMode(inputImage: CIImage, inputBackgroundImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIDifferenceBlendMode") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputBackgroundImage, forKey: kCIInputBackgroundImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  @available(iOS 9, *)
  static func discBlur(inputImage: CIImage, inputRadius: NSNumber = 8) -> UIImage? {
    guard let filter = CIFilter(name: "CIDiscBlur") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputRadius, forKey: kCIInputRadiusKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  @available(iOS 11, *)
  static func disparityToDepth(inputImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIDisparityToDepth") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  @available(iOS 8, *)
  static func divideBlendMode(inputImage: CIImage, inputBackgroundImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIDivideBlendMode") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputBackgroundImage, forKey: kCIInputBackgroundImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  @available(iOS 5, *)
  static func exclusionBlendMode(inputImage: CIImage, inputBackgroundImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIExclusionBlendMode") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputBackgroundImage, forKey: kCIInputBackgroundImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  @available(iOS 5, *)
  static func falseColor(inputImage: CIImage, inputColor0: CIColor, inputColor1: CIColor) -> UIImage? {
    guard let filter = CIFilter(name: "CIFalseColor") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputColor0, forKey: "inputColor0")
    filter.setValue(inputColor1, forKey: "inputColor1")
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  @available(iOS 5, *)
  static func gaussianGradient(inputCenter: CIVector = CIVector(x: 150.0, y: 150.0), inputColor0: CIColor, inputColor1: CIColor, inputRadius: NSNumber = 300) -> UIImage? {
    guard let filter = CIFilter(name: "CIGaussianGradient") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputCenter, forKey: kCIInputCenterKey)
    filter.setValue(inputColor0, forKey: "inputColor0")
    filter.setValue(inputColor1, forKey: "inputColor1")
    filter.setValue(inputRadius, forKey: kCIInputRadiusKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  @available(iOS 5, *)
  static func hardLightBlendMode(inputImage: CIImage, inputBackgroundImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIHardLightBlendMode") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputBackgroundImage, forKey: kCIInputBackgroundImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  @available(iOS 5, *)
  static func hueBlendMode(inputImage: CIImage, inputBackgroundImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIHueBlendMode") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputBackgroundImage, forKey: kCIInputBackgroundImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  @available(iOS 11, *)
  static func labDeltaE(inputImage: CIImage, inputImage2: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CILabDeltaE") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputImage2, forKey: "inputImage2")
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  @available(iOS 5, *)
  static func lightenBlendMode(inputImage: CIImage, inputBackgroundImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CILightenBlendMode") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputBackgroundImage, forKey: kCIInputBackgroundImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  @available(iOS 8, *)
  static func linearBurnBlendMode(inputImage: CIImage, inputBackgroundImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CILinearBurnBlendMode") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputBackgroundImage, forKey: kCIInputBackgroundImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  
  
  
  @available(iOS 5, *)
  static func multiplyBlendMode(inputImage: CIImage, inputBackgroundImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIMultiplyBlendMode") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputBackgroundImage, forKey: kCIInputBackgroundImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  @available(iOS 5, *)
  static func multiplyCompositing(inputImage: CIImage, inputBackgroundImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIMultiplyCompositing") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputBackgroundImage, forKey: kCIInputBackgroundImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  @available(iOS 5, *)
  static func overlayBlendMode(inputImage: CIImage, inputBackgroundImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIOverlayBlendMode") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputBackgroundImage, forKey: kCIInputBackgroundImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  
  
  @available(iOS 7, *)
  static func photoEffectChrome(inputImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIPhotoEffectChrome") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  @available(iOS 7, *)
  static func photoEffectFade(inputImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIPhotoEffectFade") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  
  //Impot
  @available(iOS 7, *)
  static func photoEffectNoir(inputImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIPhotoEffectNoir") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  //Import
  @available(iOS 7, *)
  static func photoEffectProcess(inputImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIPhotoEffectProcess") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  //Import
  @available(iOS 7, *)
  static func photoEffectTonal(inputImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIPhotoEffectTonal") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  
  
  
  
  @available(iOS 6, *)
  static func randomGenerator() -> UIImage? {
    guard let filter = CIFilter(name: "CIRandomGenerator") else {
      return nil
    }
    filter.setDefaults()
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  
  
  //Import
  @available(iOS 5, *)
  static func sepiaTone(inputImage: CIImage, inputIntensity: NSNumber = 1) -> UIImage? {
    guard let filter = CIFilter(name: "CISepiaTone") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputIntensity, forKey: kCIInputIntensityKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  //Import
  @available(iOS 5, *)
  static func softLightBlendMode(inputImage: CIImage, inputBackgroundImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CISoftLightBlendMode") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputBackgroundImage, forKey: kCIInputBackgroundImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  //Imaport
  @available(iOS 5, *)
  static func sourceOverCompositing(inputImage: CIImage, inputBackgroundImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CISourceOverCompositing") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputBackgroundImage, forKey: kCIInputBackgroundImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  
  
  
  
  //Imaport
  @available(iOS 10, *)
  static func thermal(inputImage: CIImage) -> UIImage? {
    guard let filter = CIFilter(name: "CIThermal") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  
  
  
  
  
  
  
  
  
  //Important
  @available(iOS 5, *)
  static func whitePointAdjust(inputImage: CIImage, inputColor: CIColor) -> UIImage? {
    guard let filter = CIFilter(name: "CIWhitePointAdjust") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputColor, forKey: kCIInputColorKey)
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
  
  
  
  
  
  @available(iOS 8.3, *)
  static func zoomBlur(inputImage: CIImage, inputCenter: CIVector = CIVector(x: 150.0, y: 150.0), inputAmount: NSNumber = 20) -> UIImage? {
    guard let filter = CIFilter(name: "CIZoomBlur") else {
      return nil
    }
    filter.setDefaults()
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    filter.setValue(inputCenter, forKey: kCIInputCenterKey)
    filter.setValue(inputAmount, forKey: "inputAmount")
    let displayImage = UIImage(cgImage: CIContext(options: nil).createCGImage(filter.outputImage!, from: filter.outputImage!.extent)!)
    return displayImage
  }
}
