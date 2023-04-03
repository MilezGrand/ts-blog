"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/index");
const validations_1 = require("../validations");
const utils_1 = require("../utils");
const router = (0, express_1.Router)();
router.get('/', index_1.PostController.getAll);
router.post('/', utils_1.checkAuth, validations_1.postCreateValidation, utils_1.handleValidationErrors, index_1.PostController.create);
router.get('/:id', index_1.PostController.getOne);
router.delete('/:id', utils_1.checkAuth, index_1.PostController.remove);
router.patch('/:id', utils_1.checkAuth, validations_1.postCreateValidation, utils_1.handleValidationErrors, index_1.PostController.update);
exports.default = router;
