
#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(ImgFilter, NSObject)

RCT_EXTERN_METHOD(myFun)
RCT_EXTERN_METHOD(fun_withArg:(NSString*)fileUrl
                  callback:(RCTResponseSenderBlock)callback)

@end
