import { ErrorType } from "../../constant/global.constant";
import AppError from "../../errors/AppError";
import Category from "../Category/category.model";
import { TSubcategory } from "./subcategory.interface";
import Subcategory from "./subcategory.model";

const createNewSubcategoryIntoDB = async (data: TSubcategory) => {
  if (!(await Category.findById(data.category))) {
    throw new AppError(400, "Category not exist", ErrorType.validation);
  }

  if (await Subcategory.findOne({ name: data.name })) {
    throw new AppError(
      400,
      `${data.name} is already exist`,
      ErrorType.validation,
    );
  }

  const result = await Subcategory.create(data);

  return result;
};

const getSubcategoriesByCategory = async (categoryId: string) => {
  if (!(await Category.findById(categoryId))) {
    throw new AppError(400, "category id is not found", ErrorType.validation);
  }
  const result = await Subcategory.find({ category: categoryId }, { __v: 0 });
  return result;
};

const updateSubcategoryIntoDB = async (
  subcategoryId: string,
  data: Partial<TSubcategory>,
) => {
  const currentSubcategory = await Subcategory.findById(subcategoryId);

  if (!currentSubcategory) {
    throw new AppError(400, `invalid subcategory id`, ErrorType.validation);
  }

  if (data?.category && !(await Category.findById(data.category))) {
    throw new AppError(400, "Category not exist", ErrorType.validation);
  }

  if (data?.name && (await Subcategory.findOne({ name: data.name }))) {
    throw new AppError(
      400,
      `${data.name} is already exist`,
      ErrorType.validation,
    );
  }

  const result = await Subcategory.findByIdAndUpdate(subcategoryId, data, {
    projection: { __v: 0 },
    new: true,
  });

  return result;
};

const deleteSubcategoryIntoDB = async (subcategoryId: string) => {
  if (!(await Subcategory.findById(subcategoryId))) {
    throw new AppError(400, `invalid subcategory id`, ErrorType.validation);
  }

  await Subcategory.findByIdAndDelete(subcategoryId);

  return null;
};

const subcategoryServices = {
  createNewSubcategoryIntoDB,
  getSubcategoriesByCategory,
  updateSubcategoryIntoDB,
  deleteSubcategoryIntoDB,
};
export default subcategoryServices;
