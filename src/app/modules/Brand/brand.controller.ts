import catchAsyncHandler from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import brandServices from "./brand.service";

const createNewBrand = catchAsyncHandler(async (req, res) => {
  const result = await brandServices.createNewBrandIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully add new brand",
    data: result,
  });
});

const getAllBrand = catchAsyncHandler(async (req, res) => {
  const result = await brandServices.getAllBrandFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all brand",
    data: result,
  });
});

const updateBrand = catchAsyncHandler(async (req, res) => {
  const result = await brandServices.updateBrandIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Brand is successfully updated",
    data: result,
  });
});

const deleteBrand = catchAsyncHandler(async (req, res) => {
  const result = await brandServices.deleteBrandIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Brand is successfully Deleted",
    data: result,
  });
});

const brandControllers = {
  createNewBrand,
  getAllBrand,
  updateBrand,
  deleteBrand,
};

export default brandControllers;
