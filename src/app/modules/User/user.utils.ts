import User from "./user.model";

export const generateUserId = async () => {
  let currentId = (0).toString();
  const lastUserId = await User.findOne({}, { id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  if (lastUserId) {
    currentId = lastUserId.id;
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(6, "0");

  return incrementId;
};
