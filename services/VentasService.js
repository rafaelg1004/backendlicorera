const BaseService = require('./BaseService');

class VentasService extends BaseService {
  constructor(ventasRepository) {
    super(ventasRepository);
  }

  async registrarVenta(data) {
    const { cliente_id, empleado_id, total_venta, metodo_pago, productos } = data;
    const client = await this.repository.getClient();

    try {
      await client.query('BEGIN');

      const ventaResult = await client.query(
        `INSERT INTO ventas (cliente_id, empleado_id, total, metodo_pago, fecha) 
         VALUES ($1, $2, $3, $4, NOW()) RETURNING id`,
        [cliente_id || null, empleado_id, total_venta, metodo_pago]
      );
      const venta_id = ventaResult.rows[0].id;

      for (let item of productos) {
        await client.query(
          `INSERT INTO detalle_ventas (venta_id, producto_id, unidad_medida_id, cantidad, precio_unitario, subtotal)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [venta_id, item.producto_id, item.unidad_medida_id, item.cantidad_vendida, item.precio_unitario, item.subtotal]
        );

        const unidadResult = await client.query(
          `SELECT factor_conversion FROM unidades_medida WHERE id = $1 AND producto_id = $2`,
          [item.unidad_medida_id, item.producto_id]
        );

        if (unidadResult.rows.length === 0) {
          throw new Error(`Unidad de medida no encontrada o no pertenece al producto (ID: ${item.producto_id})`);
        }

        const factor_conversion = unidadResult.rows[0].factor_conversion;
        const cantidad_a_descontar = item.cantidad_vendida * factor_conversion;

        const inventarioResult = await client.query(
          `SELECT cantidad_disponible FROM inventario WHERE producto_id = $1`,
          [item.producto_id]
        );

        if (inventarioResult.rows.length === 0) {
          throw new Error(`El producto con ID ${item.producto_id} no tiene registro en el inventario.`);
        }

        const stock_actual = inventarioResult.rows[0].cantidad_disponible;

        if (stock_actual < cantidad_a_descontar) {
          throw new Error(`Stock insuficiente para el producto ID ${item.producto_id}. Disponible: ${stock_actual}, Requerido: ${cantidad_a_descontar}`);
        }

        await client.query(
          `UPDATE inventario SET cantidad_disponible = cantidad_disponible - $1 WHERE producto_id = $2`,
          [cantidad_a_descontar, item.producto_id]
        );
      }

      await client.query('COMMIT');
      return { message: 'Venta registrada exitosamente', venta_id };

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = VentasService;
