import catchAsyncHandler from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import productServices from "./product.service";

const createNewProduct = catchAsyncHandler(async (req, res) => {
  const result = await productServices.createNewProductIntoDB({
    ...req.body,
    user: req.user.id,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully add product",
    data: result,
  });
});

const getAllProductForUsers = catchAsyncHandler(async (req, res) => {
  const result = await productServices.getAllProductForUsers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all products",
    data: result,
  });
});

const getAllProductForAdmin = catchAsyncHandler(async (req, res) => {
  const result = await productServices.getAllProductForAdmin();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all products",
    data: result,
  });
});

const getAllProductForSeller = catchAsyncHandler(async (req, res) => {
  const result = await productServices.getAllProductForSeller(req.user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all products",
    data: result,
  });
});

const getSingleProduct = catchAsyncHandler(async (req, res) => {
  const result = await productServices.getSingleProduct(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved product",
    data: result,
  });
});

const updateProductIntoDB = catchAsyncHandler(async (req, res) => {
  const result = await productServices.updateProductIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product is successfully updated",
    data: result,
  });
});

const updateProductActivation = catchAsyncHandler(async (req, res) => {
  const result = await productServices.updateProductActivation(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product activation is successfully updated",
    data: result,
  });
});

const deleteProductIntoDB = catchAsyncHandler(async (req, res) => {
  const result = await productServices.deleteProductIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product is successfully deleted",
    data: result,
  });
});

const productControllers = {
  createNewProduct,
  getAllProductForUsers,
  getAllProductForAdmin,
  getAllProductForSeller,
  getSingleProduct,
  updateProductIntoDB,
  updateProductActivation,
  deleteProductIntoDB,
};

export default productControllers;
