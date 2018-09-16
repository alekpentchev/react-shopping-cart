import nock from "nock";
import paymentsApi from "../paymentsApi";

describe("paymentsApi", () => {
  it("authorizes the client", async () => {
    nock('http://payments.local')
        .post('/auth/token' , {username: 'test' , password:'test'})
        .reply(200 , {
            token: '123TOKEN'
        });

      const token = await paymentsApi.authorizeClient('test' , 'test')
      expect(token).toBe('123TOKEN')
  });

  it("throws an error when credentials are wrong", () => {
      nock("http://payments.local")
          .post("/auth/token", { username: "test", password: "" })
          .reply(401);

      return paymentsApi
          .authorizeClient("test", "")
          .catch(e => expect(e.message).toMatch("Unauthorized"));
  });

  xit("throws an error when credentials are wrong", async () => {
      const payAuthBackend = nock('http://payments.local')
          .post("/auth/token", { username: "test", password: "test"})
          .reply(401);

      let anon = async () =>  {
          return await paymentsApi.authorizeClient("test", "test")
      }

      expect(anon()).rejects.toEqual(new Error('Unauthorized'))
  });

  it("processes card payment", async () => {
      const token = '123TOKEN';
      const card = {number: '4111111111111111' , securityCode: '950' , expMonth: '07' , expYear: '21' , owner: 'John Doe'};
      const amount = 123;

    nock('http://payments.local')
        .post('/payments/payment' , {token , amount: amount * 100 , card})
        .reply(200 , {
          transactionId: "TX123"
        })
      const payment = await paymentsApi.processPayment(token, card, amount)

      expect(payment).toBe('TX123');
  });

    xit("processes card payment", async () => {

        let token = "123ABC";
        let amount = 950;
        let card = {
            "number": "4111111111111111",
            "securityCode": "950",
            "expMonth": "07",
            "expYear": "21",
            "owner": "John Doe"
        };
        const reqBody = {token, amount: amount * 100, card}
        const payAuthBackend = nock('http://payments.local')
            .post("/payments/payment", reqBody)
            .reply(200, { "transactionId": "TX123" });

        let transactionId = await paymentsApi.processPayment(token, card, amount);
        expect(typeof transactionId).toEqual("string")
    });

  it("checks if transaction is completed", async () => {
    const transactionId = 'TX123'
    const token = '123TOKEN';

    nock('http://payments.local')
        .get(`/payments/payment/${transactionId}?token=${token}`)
        .reply(200 , {
            status: 'COMPLETED'
        })

    const completed = await paymentsApi.isPaymentCompleted(token, transactionId)
    expect(completed).toBeTruthy()
  });
});
