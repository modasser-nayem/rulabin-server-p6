import { ErrorType } from "../../constant/global.constant";
import AppError from "../../errors/AppError";
import Product from "../Product/product.model";
import { TBrand } from "./brand.interface";
import Brand from "./brand.model";

const createNewBrandIntoDB = async (data: TBrand) => {
  if (await Brand.findOne({ name: data.name })) {
    throw new AppError(
      400,
      `${data.name} is already exist`,
      ErrorType.validation,
    );
  }

  const result = await Brand.create(data);

  return result;
};

const getAllBrandFromDB = async () => {
  const result = await Brand.find({}, { __v: 0 });
  return result;
};

const updateBrandIntoDB = async (brandId: string, data: Partial<TBrand>) => {
  const currentBrand = await Brand.findById(brandId);

  if (!currentBrand) {
    throw new AppError(400, `invalid brand id`, ErrorType.validation);
  }

  if (data?.name && (await Brand.findOne({ name: data.name }))) {
    throw new AppError(
      400,
      `Brand name is already exist`,
      ErrorType.validation,
    );
  }

  const result = await Brand.findByIdAndUpdate(brandId, data, {
    projection: { __v: 0 },
    new: true,
  });

  return result;
};

const deleteBrandIntoDB = async (brandId: string) => {
  if (!(await Brand.findById(brandId))) {
    throw new AppError(400, `invalid brand id`, ErrorType.validation);
  }

  if (await Product.findOne({ brand: brandId })) {
    throw new AppError(
      400,
      `This brand already used, can't delete it`,
      ErrorType.badRequest,
    );
  }

  await Brand.findByIdAndDelete(brandId);

  return null;
};

const brandServices = {
  createNewBrandIntoDB,
  getAllBrandFromDB,
  updateBrandIntoDB,
  deleteBrandIntoDB,
};
export default brandServices;
