import catchAsyncHandler from "../../utils/catchAsyncHandler";
import sendResponse from "../../utils/sendResponse";
import subcategoryServices from "./subcategory.service";

const createNewSubcategory = catchAsyncHandler(async (req, res) => {
  const result = await subcategoryServices.createNewSubcategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully add new subcategory",
    data: result,
  });
});

const getAllSubcategoryByCategory = catchAsyncHandler(async (req, res) => {
  const result = await subcategoryServices.getSubcategoriesByCategory(
    req.params.category,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved all subcategory",
    data: result,
  });
});

const updateSubcategory = catchAsyncHandler(async (req, res) => {
  const result = await subcategoryServices.updateSubcategoryIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Subcategory is successfully updated",
    data: result,
  });
});

const deleteSubcategory = catchAsyncHandler(async (req, res) => {
  const result = await subcategoryServices.deleteSubcategoryIntoDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Subcategory is successfully Deleted",
    data: result,
  });
});

const subcategoryControllers = {
  createNewSubcategory,
  getAllSubcategoryByCategory,
  updateSubcategory,
  deleteSubcategory,
};

export default subcategoryControllers;
