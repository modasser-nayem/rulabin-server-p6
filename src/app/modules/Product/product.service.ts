import { ErrorType } from "../../constant/global.constant";
import AppError from "../../errors/AppError";
import Brand from "../Brand/brand.model";
import Category from "../Category/category.model";
import Subcategory from "../Subcategory/subcategory.model";
import { TProduct } from "./product.interface";
import Product from "./product.model";

const createNewProductIntoDB = async (data: TProduct) => {
  // check title exist
  if (await Product.findOne({ title: data.title })) {
    throw new AppError(400, "title already exist", ErrorType.validation);
  }

  // check model exist
  if (await Product.findOne({ model: data.model })) {
    throw new AppError(400, "model already exist", ErrorType.validation);
  }

  // check brand is exist
  if (!(await Brand.findById(data.brand))) {
    throw new AppError(400, "Brand is not exist", ErrorType.validation);
  }

  // check category is exist
  if (!(await Category.findById(data.category))) {
    throw new AppError(400, "Category is not exist", ErrorType.validation);
  }

  // check subcategory is exist
  if (data?.subcategory && !(await Subcategory.findById(data.subcategory))) {
    throw new AppError(400, "Subcategory is not exist", ErrorType.validation);
  }

  const result = await Product.create(data);

  return result;
};

const getAllProductForUsers = async () => {
  const result = await Product.find(
    {},
    { __v: 0, user: 0, active: 0, isDeleted: 0 },
  );
  return result;
};

const getAllProductForAdmin = async () => {
  const result = await Product.find({}, { __v: 0 });
  return result;
};

const getAllProductForSeller = async (sellerId: string) => {
  const result = await Product.find(
    { user: sellerId },
    { __v: 0, user: 0, isDeleted: 0 },
  );

  return result;
};

const getSingleProduct = async (productId: string) => {
  const result = await Product.findById(productId, {
    __v: 0,
    user: 0,
    active: 0,
    isDeleted: 0,
  });

  if (!result) {
    throw new AppError(404, "Product not found", ErrorType.notfound);
  }

  return result;
};

const updateProductIntoDB = async (
  productId: string,
  data: Partial<TProduct>,
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError(404, "Product not found", ErrorType.notfound);
  }

  // check title exist
  if (data?.title && (await Product.findOne({ title: data.title }))) {
    throw new AppError(400, "title already exist", ErrorType.validation);
  }

  // check model exist
  if (data?.model && (await Product.findOne({ model: data.model }))) {
    throw new AppError(400, "model already exist", ErrorType.validation);
  }

  // check brand is exist
  if (data?.brand && !(await Brand.findById(data.brand))) {
    throw new AppError(400, "Brand is not exist", ErrorType.validation);
  }

  // check category is exist
  if (data?.category && !(await Category.findById(data.category))) {
    throw new AppError(400, "Category is not exist", ErrorType.validation);
  }

  // check subcategory is exist
  if (data?.subcategory && !(await Subcategory.findById(data.subcategory))) {
    throw new AppError(400, "Subcategory is not exist", ErrorType.validation);
  }

  const result = await Product.findByIdAndUpdate(product._id, data, {
    projection: { __v: 0, user: 0, isDeleted: 0 },
    new: true,
  });

  return result;
};

const updateProductActivation = async (productId: string) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError(404, "Product not found", ErrorType.notfound);
  }
  await Product.findByIdAndUpdate(product?._id, {
    active: product.active === true ? false : true,
  });

  return null;
};

const deleteProductIntoDB = async (productId: string) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError(404, "Product not found", ErrorType.notfound);
  }
  await Product.findByIdAndUpdate(product?._id, { isDeleted: true });

  return null;
};

const productServices = {
  createNewProductIntoDB,
  getAllProductForUsers,
  getAllProductForAdmin,
  getAllProductForSeller,
  getSingleProduct,
  updateProductIntoDB,
  updateProductActivation,
  deleteProductIntoDB,
};
export default productServices;
