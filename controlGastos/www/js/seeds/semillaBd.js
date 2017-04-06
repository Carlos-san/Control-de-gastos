var semillaBd = {
  credenciales : {
    nombre : "controlGastosBd2.db",
    length : 2000000,
    version : "1.0"
  },
  creacionTablas: [
    "CREATE TABLE IF NOT EXISTS base (id INTEGER PRIMARY KEY, fecha_final TEXT, fecha_inicial TEXT, nombre TEXT, valor_total REAL)",
    "CREATE TABLE IF NOT EXISTS tactividad (id INTEGER PRIMARY KEY, titulo TEXT, descripcion TEXT)",
    "CREATE TABLE IF NOT EXISTS actividad (id INTEGER PRIMARY KEY, id_base INTEGER, nombre TEXT, id_tactividad INTEGER, FOREIGN KEY(id_base) REFERENCES base(id), FOREIGN KEY(id_tactividad) REFERENCES tactividad(id))",
    "CREATE TABLE IF NOT EXISTS movimientos (id INTEGER PRIMARY KEY, valor REAL, tipo TEXT, fecha TEXT, descripcion TEXT, id_actividad INTEGER, id_base INTEGER,  FOREIGN KEY(id_base) REFERENCES base(id), FOREIGN KEY(id_actividad) REFERENCES actividad(id))"
  ]
}
