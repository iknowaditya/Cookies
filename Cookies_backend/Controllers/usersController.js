const User = require("../Models/authUser");

async function getUserById(req, res) {
  try {
    if (!req?.params?.id) {
      return res.status(400).json({ message: "User ID required" });
    }

    const user = await User.findOne({ _id: req.params.id }).exec();

    if (!user) {
      return res
        .status(404)
        .json({ message: `User ID ${req.params.id} not found` });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Get all users..
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    if (!users.length) {
      return res.status(204).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Delete a user.
async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    // Check if user ID is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    // Find the user by ID
    const user = await User.findOne({ _id: userId }).exec();

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: `User ID ${userId} not found` });
    }

    // Delete the user
    await user.deleteOne({ _id: userId });

    // Respond with a success message
    res.status(200).json({ message: `User ID ${userId} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getUserById,
  getAllUsers,
  deleteUser,
};
