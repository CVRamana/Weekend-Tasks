//
//  Foo.swift
//  NativeLinking
//
//  Created by Appinventiv on 27/01/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
@objc(Foo)
class Foo: NSObject {
  
  @objc func doThis() -> Void {
    //let greeting:String="Hi Raman from the swift again"
   // print(greeting)
  }
  
  @objc func download(_ fileUrl: String, callback: RCTResponseSenderBlock) -> Void {
      callback([
        "value through the callback from the xcode method ramanNitishNaalll",
        "ram","great"
      ])
  }
  
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
}




