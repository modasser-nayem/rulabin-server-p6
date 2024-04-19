import catchAsyncHandler from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import categoryServices from "./category.service";

const createNewCategory = catchAsyncHandler(async (req, res) => {
  const result = await categoryServices.createNewCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully add new category",
    data: result,
  });
});

const getAllCategory = catchAsyncHandler(async (req, res) => {
  const result = await categoryServices.getAllCategoryFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all category",
    data: result,
  });
});

const getSingleCategory = catchAsyncHandler(async (req, res) => {
  const result = await categoryServices.getSingleCategory(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved category",
    data: result,
  });
});

const updateCategory = catchAsyncHandler(async (req, res) => {
  const result = await categoryServices.updateCategoryIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category is successfully updated",
    data: result,
  });
});

const deleteCategory = catchAsyncHandler(async (req, res) => {
  const result = await categoryServices.deleteCategoryIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category is successfully Deleted",
    data: result,
  });
});

const categoryControllers = {
  createNewCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};

export default categoryControllers;
