import { ErrorType } from "../../constant/global.constant";
import AppError from "../../errors/AppError";
import Product from "../Product/product.model";
import { TCategory } from "./category.interface";
import Category from "./category.model";

const createNewCategoryIntoDB = async (data: TCategory) => {
  if (await Category.findOne({ name: data.name })) {
    throw new AppError(
      400,
      `${data.name} is already exist`,
      ErrorType.validation,
    );
  }

  const result = await Category.create(data);

  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await Category.find({}, { __v: 0 });
  return result;
};

const getSingleCategory = async (categoryId: string) => {
  const result = await Category.findById(categoryId, { __v: 0 });

  if (!result) {
    throw new AppError(404, `Category not found!`, ErrorType.notfound);
  }

  return result;
};

const updateCategoryIntoDB = async (
  categoryId: string,
  data: Partial<TCategory>,
) => {
  const currentCategory = await Category.findById(categoryId);

  if (!currentCategory) {
    throw new AppError(400, `invalid category id`, ErrorType.validation);
  }

  if (data?.name && (await Category.findOne({ name: data.name }))) {
    throw new AppError(
      400,
      `Category name is already exist`,
      ErrorType.validation,
    );
  }

  const result = await Category.findByIdAndUpdate(categoryId, data, {
    projection: { __v: 0 },
    new: true,
  });

  return result;
};

const deleteCategoryIntoDB = async (categoryId: string) => {
  if (!(await Category.findById(categoryId))) {
    throw new AppError(400, `invalid category id`, ErrorType.validation);
  }

  if (await Product.findOne({ category: categoryId })) {
    throw new AppError(
      400,
      `This category already used, can't delete it`,
      ErrorType.badRequest,
    );
  }

  await Category.findByIdAndDelete(categoryId);

  return null;
};

const categoryServices = {
  createNewCategoryIntoDB,
  getAllCategoryFromDB,
  getSingleCategory,
  updateCategoryIntoDB,
  deleteCategoryIntoDB,
};
export default categoryServices;
