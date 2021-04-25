import React from "react";
import { useForm } from "react-hook-form";
import MainContainer from "./MainContainer";
import Form from "./Form";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import CategoryInput from "./CategoryInput";
import PriceInput from "./PriceInput";
import { useData } from "./DataContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is a required field"),
  price: yup.number().required("Price is required field"),
});

const EditProductForm = ({ ...props }) => {
  console.log(props.item)
  const { setValues, data } = useData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: props.item.name,
      description: props.item.description,
      category: props.item.category,
      price: props.item.price,
      files: data.files,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setValues(data);
    props.toggleNext();
    console.log(data);
  };

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name")}
          name="name"
          type="text"
          label="Name"
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
        <Input
          {...register("description")}
          name="description"
          type="text"
          label="Description"
          error={!!errors.description}
          helperText={errors?.description?.message}
        />
        <CategoryInput
          {...register("category")}
          name="category"
          error={!!errors.category}
          helperText={errors?.category?.message}
        />
        <PriceInput
          {...register("price")}
          name="price"
          label="Price"
          type="number"
          error={!!errors.price}
          defaultValue={0}
          helperText={errors?.price?.message}
        />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default EditProductForm;
