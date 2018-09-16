import React, { Component } from "react";
import { Form, Select, Button } from "antd";
import deliveryMethods from "../../data/deliveryMethods.json";

const FormItem = Form.Item;
const Option = Select.Option;

class AddressForm extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onFormSubmit(values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  renderSelect() {
    return (
      <Select>
        <Option value="" />
        {deliveryMethods.map(delivery => (
          <Option key={delivery.id} value={delivery.id}>
            {delivery.name} (+
            {delivery.price}
            zł)
          </Option>
        ))}
      </Select>
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { onBackButtonPress } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label={<span>Delivery method</span>}>
          {getFieldDecorator("deliveryMethod", {
            rules: [
              {
                required: true,
                message: "Please select delivery method"
              }
            ]
          })(this.renderSelect())}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button onClick={onBackButtonPress}>Go back</Button>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(AddressForm);
