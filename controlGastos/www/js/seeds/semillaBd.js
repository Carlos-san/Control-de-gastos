var semillaBd = {
  credenciales : {
    nombre : "controlGastosBd.db",
    length : 2000000,
    version : "1.0"
  },
  creacionTablas: [
    "CREATE TABLE IF NOT EXISTS base (id INTEGER, periodo REAL, nombre TEXT, valor_total REAL)",
    "CREATE TABLE IF NOT EXISTS tactividad (id INTEGER, titulo TEXT, descripcion TEXT)",
    "CREATE TABLE IF NOT EXISTS actividad (id INTEGER, id_base INTEGER, nombre TEXT, id_tactividad INTEGER, FOREIGN KEY(id_base) REFERENCES base(id), FOREIGN KEY(id_tactividad) REFERENCES tactividad(id))",
    "CREATE TABLE IF NOT EXISTS movimientos (id INTEGER, valor REAL, tipo TEXT, descripcion TEXT, id_actividad INTEGER, id_base INTEGER,  FOREIGN KEY(id_base) REFERENCES base(id), FOREIGN KEY(id_actividad) REFERENCES actividad(id))"
  ]
}
