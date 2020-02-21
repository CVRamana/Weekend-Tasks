//
//  ImageFilter_Reboot.m
//  NativeLinking
//
//  Created by Appinventiv on 29/01/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"

@interface
RCT_EXTERN_MODULE(ImageFilter_Reboot,NSObject)
RCT_EXTERN_METHOD(download:(NSString*)fileUrl
fillterType:(NSInteger *)fillterType
callback:(RCTResponseSenderBlock))

RCT_EXTERN_METHOD(deleteFolder:(NSString*)fileUrl)
@end
