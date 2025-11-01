import { Router } from "express";
import { requireJwtCookie } from "../middlewares/auth.middleware.js";
import { policies } from "../middlewares/policies.middleware.js";
import { orderController as ctrl} from "../controllers/order.controller.js";

const router = Router();

router.use(requireJwtCookie);

//vistas

router.get("/orders", (req, res) => ctrl.listView(req, res));


// API REST

router.get("/api/orders", (req, res) => ctrl.listJSON(req, res));
router.get("/api/orders/:id", policies("admin", "user"), (req, res) =>
  ctrl.getById(req, res)
);
router.get("/api/orders/:code", policies("admin", "user"), (req, res) =>
    ctrl.getByCode(req, res)
  );
router.post("/api/orders", policies("admin", "user"), (req, res) =>
  ctrl.create(req, res)
);
router.put("/api/orders/:id", policies("admin"), (req, res) =>
  ctrl.update(req, res)
);
router.delete("/api/orders/:id", policies("admin"), (req, res) =>
  ctrl.remove(req, res)
);


// SEMILLA BASE

router.post("/api/orders/seed", policies("admin", 'user'), (req, res) =>
  ctrl.seed(req, res)
);

export default router;