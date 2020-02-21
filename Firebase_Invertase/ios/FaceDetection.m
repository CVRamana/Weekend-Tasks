//
//  FaceDetection.m
//  Firebase_Invertase
//
//  Created by Appinventiv on 13/02/20.
//  Copyright © 2020 Facebook. All rights reserved.
//


#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(FaceDetection, NSObject)

//RCT_EXTERN_METHOD(myFun)

RCT_EXTERN_METHOD(getMlKit:(NSString*)fileUrl
                  secondArg:(NSInteger*)secondArg
                  
           callback:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(deleteFolder: (RCTResponseSenderBlock)callback)

@end
