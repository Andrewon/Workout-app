import * as SQLite from "expo-sqlite";
import { useState } from "react";

export var db = SQLite.openDatabase("UserDatabase.db");
