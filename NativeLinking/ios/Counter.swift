
import Foundation
@objc(Counter)
class Counter: NSObject{
  
 private var count=0
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["initialCount": 0]
  }
  @objc
  func increment()->Void{
    count+=1
    print("count is \(count)")
  }
  
  //for decrementing the count
  @objc
  func decrement(_ resolve:RCTPromiseResolveBlock,
                 rejecter reject:RCTPromiseRejectBlock
                 )->Void{
    if (count==0){
      let error = NSError(domain: "", code: 200, userInfo: nil)
      reject("E_COUNT", "count cannot be negative", error)
    }else{
      count -= 1
      resolve("count was decremented")
    }
  }
  
  @objc
  func getCount(_ callback: RCTResponseSenderBlock) {
    callback([count,
              123.9,               // int or float
      "third argument",    // string
      [1, 2.2, "3"],       // array
      ["a": 1, "b": 2]    // object])
      ])
  }
  
  //to suppress the warning
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

}
