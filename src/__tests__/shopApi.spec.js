import shopApi from '../shopApi';

describe('shopApi' , () => {

    const products = {
        productIds: [4],
        quantityById: {4:2}
    }

    it('should get products as list' , async () => {
        const result = await shopApi.getProducts();

        expect(result.data.products).toBeDefined();
        expect(result.data.products).toBeInstanceOf(Array);
        expect(result.data.products[0]).toMatchObject({
            id: expect.any(Number),
            title: expect.any(String),
            price: expect.any(Number),
            image: expect.any(String)
        })
    })

    it('Creates an order' , async () => {
        const result = await shopApi.createOrder(products);

        expect(result.data).toBeDefined();
        expect(result.data).toBeInstanceOf(Object);
        expect(result.data).toMatchObject({
            status: "NEW",
            orderNumber: expect.any(Number),
            products
        });
    })

    it('should update delivery address' , async () => {
        const order = await shopApi.createOrder(products);
        const address = {
            city: 'Houston' ,
            country: 'Poland' ,
            fullname: 'Foo Bar' ,
            street: 'Baz 2'
        };
        const changeAddressResult = await shopApi.changeDeliveryAddress(order.data.orderNumber, address)
        const editedOrder = await shopApi.getOrder(order.data.orderNumber)

        expect(changeAddressResult.data).toBeDefined();
        expect(changeAddressResult.data).toMatchObject({status: 'OK'});
        expect(editedOrder.data.deliveryAddress).toBeDefined();
        expect(editedOrder.data.deliveryAddress).toMatchObject(address)
    })

    it('should update delivery method' , async () => {
        const order = await shopApi.createOrder(products);
        const orderNumber = order.data.orderNumber;
        const deliveryMethod = 'post';
        const changeDeliveryMethod = await shopApi.changeDeliveryMethod(orderNumber, deliveryMethod);
        const editedOrder = await shopApi.getOrder(orderNumber)

        expect(changeDeliveryMethod.data).toBeDefined();
        expect(changeDeliveryMethod.data).toMatchObject({status: 'OK'});
        expect(editedOrder.data.deliveryMethod).toBe('post')
    })

    it('should submit order' , async () => {
        const order = await shopApi.createOrder(products);
        const orderNumber = order.data.orderNumber;
        const submitted = await shopApi.submitOrder(orderNumber);

        expect(submitted.data).toBeDefined();
        expect(submitted.data).toMatchObject({status:'OK'})
    })

    // it('should get order' , async () => {
    //     const order = await shopApi.createOrder(products);
    //     const orderNumber = order.data.orderNumber;
    //     const mockOrder = {
    //         orderNumber,
    //         product: {
    //             productIds: [
    //                 4
    //             ],
    //             quantityById: {4:2}
    //         },
    //         deliveryAddress: {
    //             fullname: "Foo Bar",
    //             street: "Baz 2",
    //             city: "Houston",
    //             country: "USA"
    //         },
    //         deliveryMethod: "post"
    //     }
    //     const fetchedOrder = await shopApi.getOrder(orderNumber)
    //
    //     expect(fetchedOrder).toBeDefined();
    //     expect(fetchedOrder).toMatchObject(mockOrder)
    // })
})