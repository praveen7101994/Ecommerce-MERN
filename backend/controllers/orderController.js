import asyncHandler from "../middleware/asyncHandler.js";
import Order from "./../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  console.clear();
  console.log("req.user._id", req.user._id);
  const {
    orderItems,
    shippingAddress,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(400);
    throw new Error("Order not found.");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  // Convert page and limit to integers
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  // Aggregation pipeline
  // const pipeline = [
  //   {
  //     $facet: {
  //       items: [
  //         { $skip: (pageNumber - 1) * limitNumber },
  //         { $limit: limitNumber },
  //         { $project: { _id: 1, isPaid: 1, user: 1 } }, // Include only name and value fields, exclude _id
  //         {
  //           $lookup: {
  //             from: "users",
  //             localField: "user",
  //             foreignField: "_id",
  //             as: "username",
  //           },
  //         },
  //         {
  //           $project: { "$username.name": 1 },
  //         },
  //       ],
  //       totalCount: [{ $count: "count" }],
  //     },
  //   },

  const pipeline = [
    {
      $facet: {
        items: [
          { $skip: (pageNumber - 1) * limitNumber },
          { $limit: limitNumber },
          {
            $lookup: {
              from: "users", // Assuming Users is your collection name
              localField: "user", // Field in the current collection
              foreignField: "_id", // Field in the Users collection
              as: "userDetails", // Alias for the joined documents
            },
          },
          {
            $project: {
              _id: 1,
              isPaid: 1,
              user: { $arrayElemAt: ["$userDetails.name", 0] }, // Assuming username is in userDetails
              createdAt: 1,
              paidAt: 1,
              totalPrice: 1,
              isDelivered: 1,
            },
          },
        ],

        totalCount: [{ $count: "count" }],
      },
    },
  ];

  // Fetch data from MongoDB with aggregation
  const results = await Order.aggregate(pipeline);
  const items = results[0].items;
  const totalItems = results[0].totalCount[0]
    ? results[0].totalCount[0].count
    : 0;

  res.json({
    items,
    totalPages: Math.ceil(totalItems / limitNumber),
    currentPage: pageNumber,
  });
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
