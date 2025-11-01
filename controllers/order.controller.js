import { orderService as svc } from "../services/order.service.js";

class OrderController {
  //vista con handlebars

  async listView(req, res) {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const status = req.query.status;
      const data = await svc.list({ page, limit, status });
      res.status(200).render("order/index", {
        title: "Ordenes",
        orders: data,
        items,
        pagination: {
          page: data.page,
          pages: data.pages,
          total: data.total,
          limit: data.limit,
        },
        currentStatus: status || "all",
      });
    } catch (error) {
      console.error(["[OrderController.listView]", error]);
      res.status(500).json({ error: "Error cargando las órdenes" });
    }
  }

  //API JSON

  async listJSON(req, res) {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const status = req.query.status;
      const data = await svc.list({ page, limit, status });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const o = await svc.get(req.params.id);
      if (!o) return res.status(404).json({ error: "Orden no encontrada" });
      res.status(200).json({ order: o });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByCode(req, res) {
    try {
      const o = await svc.getByCode(req.params.code);
      if (!o) return res.status(404).json({ error: "Orden no encontrada" });
      res.status(200).json({ order: o });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async create(req, res) {
    try {
      const o = await svc.create(req.body);
      res.status(201).json({ order: o });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const o = await svc.update(req.params.id, req.body);
      if (!o) return res.status(404).json({ error: "Orden no encontrada" });
      res.status(200).json({ order: o });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async remove(req, res) {
    try {
      const o = await svc.remove(req.params.id);
      if (!o) return res.status(404).json({ error: "Orden no encontrada" });
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //semilla rapida (opcional)

  async seed(req, res) {
    try {
      const count = svc.dao.count();
      if (count > 0)
        return res
          .status(200)
          .json({ message: "Ya hay órdenes. No se planto la semilla" });
      const sample = [
        {
          code: "A-1001",
          buyerName: "Juan Perez",
          buyerEmail: "juan@gmail.com",
          items: [
            { tile: "teclado", qty: 1, unitPrice: 15000 },
            { tile: "mouse", qty: 2, unitPrice: 8000 },
          ], status: "pending",
        },
        {
            code:'A-2000', buyerName: 'Ana Garcia', buyerEmail:'ana@gmail.com', items:[
                {title: 'monitor 24 pulgadas full HD', qty: 1, unitPrice: 170000 }
            ], status: 'paid'
        }
      ];

      const created = await Promise.all(sample.map( s => svc.create (s)));
      res.status(201).json({order: created, inserted: created.length});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
  }
};

export const orderController = new OrderController();