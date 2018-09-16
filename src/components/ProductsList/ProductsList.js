import React from "react";
import { chunk } from "lodash";
import { Row, Col } from "antd";
import { ProductItem } from "..";

const ProductsList = ({ products, onAddToCart }) => {
  return (
    <div>
      {chunk(products, 4).map((row, i) => (
        <Row
          type="flex"
          justify="space-around"
          key={`row-${i}`}
          style={{ paddingBottom: "20px" }}
        >
          {row.map(product => (
            <Col span={4} key={product.id}>
              <ProductItem product={product} onAddToCart={onAddToCart} />
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
};

export default ProductsList;
