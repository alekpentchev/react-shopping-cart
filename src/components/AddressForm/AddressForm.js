import React, { Component } from "react";
import { Form, Input, Cascader, Button } from "antd";
import countries from '../../data/countries.json';

const FormItem = Form.Item;

class AddressForm extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.country = values.country[0];
        this.props.onFormSubmit(values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

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
        <FormItem {...formItemLayout} label={<span>Full name</span>}>
          {getFieldDecorator("fullname", {
            rules: [
              {
                required: true,
                message: "Please enter your full name",
                whitespace: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<span>Street address</span>}>
          {getFieldDecorator("street", {
            rules: [
              {
                required: true,
                message: "Please enter street name",
                whitespace: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<span>City</span>}>
          {getFieldDecorator("city", {
            rules: [
              {
                required: true,
                message: "Please enter city name",
                whitespace: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Country">
          {getFieldDecorator("country", {
            initialValue: ["UK"],
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your country of residence"
              }
            ]
          })(<Cascader options={countries} />)}
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
