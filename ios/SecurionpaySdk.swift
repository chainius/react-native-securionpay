import SecurionPay

@objc(Securionpay)
class SecurionpaySdk: NSObject {

     @objc(Init:bundleIdentifier:)
    func Init(publicKey: String, bundleIdentifier: String?) -> Void {
        SecurionPay.shared.publicKey = publicKey
        SecurionPay.shared.bundleIdentifier =  bundleIdentifier ?? Bundle.main.bundleIdentifier
        
    }
    
    @objc(LaunchPayment:expirymonth:expiryyear:cvv:amount:currency:resolve:reject:)
    func LaunchPayment(cardnumber : String, expirymonth : String, expiryyear : String, cvv : String, amount: Int , currency :String, resolve:@escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock)  {
       
        
        guard let  viewController = RCTPresentedViewController() else {
                return  reject("NATIVE ERROR","Failed to access a view controller", nil)
        }
        
         let tokenRequest = TokenRequest(number: cardnumber, expirationMonth: expirymonth, expirationYear: expiryyear, cvc: cvv)
              SecurionPay.shared.createToken(with: tokenRequest) { [weak self] token, error in

                  if let error = error {
                      return reject("SECURIONPAY", error.localizedMessage(), nil)
                  }

                  guard let token = token else {
                      return reject("NATIVE ERROR", "Failed getting token", nil)
                  }
               
                  SecurionPay.shared.authenticate(token: token, amount: amount, currency: currency, viewControllerPresenting3DS: viewController) { [weak self] authenticatedToken, error in
                      if error == nil {
                          let result =  self?.GetResult(data:authenticatedToken)
                          return resolve(result)
                      } else if let error = error {
                           return reject("SECURIONPAY", error.localizedMessage(), nil)
                      }
                  }
              }
    }
    
    func CreateToken(token :String)  -> Token? {
        let decoder = JSONDecoder()
        let jsonData = token.data(using: .utf8)!
        do {
            let tok = try decoder.decode(Token.self, from: jsonData)
            return tok
        } catch  {
            return nil
        }

    }
    
    @objc(LaunchPaymentWithToken:amount:currency:resolve:reject:)
    func LaunchPaymentWithToken(tokenString :String,amount: Int , currency :String, resolve:@escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock)  {
       
        guard let  viewController = RCTPresentedViewController() else {
                return  reject("NATIVE ERROR","Failed to access a view controller", nil)
        }
       
        guard let token = CreateToken(token:tokenString) else {
          return reject("NATIVE ERROR", "Failed getting token", nil)
      }
   
      SecurionPay.shared.authenticate(token: token, amount: amount, currency: currency, viewControllerPresenting3DS: viewController) { [weak self] authenticatedToken, error in
          if error == nil {
              let result =  self?.GetResult(data:authenticatedToken)
              return resolve(result)
          } else if let error = error {
               return reject("SECURIONPAY", error.localizedMessage(), nil)
          }
      }
             
    }
    
    func GetResult(data: Token?) -> NSMutableDictionary {
         let resultData = NSMutableDictionary()

        if let data = data {
            resultData.setValue(false, forKey: "canceled")
            resultData.setValue(data.id,forKey: "id")
            resultData.setValue(data.brand,forKey: "brand")
            resultData.setValue(data.country,forKey: "country")
            resultData.setValue(data.fingerprint,forKey:  "fingerprint")
            resultData.setValue(data.cardholder, forKey: "cardholder")
            resultData.setValue(data.expirationMonth,forKey:  "expirationMonth")
            resultData.setValue(data.expirationYear,forKey: "expirationYear")
            resultData.setValue(data.expirationYear,forKey:  "expirationYear")
            resultData.setValue(data.first6, forKey: "first6")
            resultData.setValue(data.last4,forKey: "last4")
            resultData.setValue(data.objectType,forKey: "objectType")
            resultData.setValue(data.type, forKey: "type")
        
        
        if(data.threeDSecureInfo != nil){
            let threeD = NSMutableDictionary()
            threeD.setValue(data.threeDSecureInfo!.currency,forKey: "currency")
            threeD.setValue(data.threeDSecureInfo!.version,forKey:"version")
            threeD.setValue(data.threeDSecureInfo!.liabilityShift ,forKey: "liabilityShift")
            threeD.setValue(data.threeDSecureInfo!.amount,forKey:"amount")
            threeD.setValue(data.threeDSecureInfo!.enrolled, forKey:"enrolled")
            resultData.setValue(threeD, forKey: "threeDSecureInfo")
        }
            
        } else {
            
                resultData.setValue(true, forKey: "canceled")
        }
           
         return resultData
       }
}
