//
//  FooBridge.m
//  NativeLinking
//
//  Created by Appinventiv on 27/01/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>


#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE(Foo, NSObject)
RCT_EXTERN_METHOD(doThis)  
RCT_EXTERN_METHOD(download:(NSString*)fileUrl callback:(RCTResponseSenderBlock))
@end
