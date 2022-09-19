#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE(Securionpay, NSObject)

RCT_EXTERN_METHOD(Init:(NSString)publicKey
                  bundleIdentifier:(NSString)bundleIdentifier)

RCT_EXTERN_METHOD(
                  LaunchPayment:(NSString)cardnumber
                  expirymonth:(NSString)expirymonth
                  expiryyear:(NSString)expiryyear
                  cvv:(NSString)cvv
                  amount:(int)amount
                  currency:(NSString)currency
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)



+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end

