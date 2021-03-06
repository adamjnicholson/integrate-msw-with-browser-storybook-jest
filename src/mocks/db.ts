import { factory, primaryKey } from "@mswjs/data";
import {
  Entity,
  ModelValueType,
  PrimaryKeyType,
  PRIMARY_KEY,
} from "@mswjs/data/lib/glossary";
import { PrimaryKey } from "@mswjs/data/lib/primaryKey";
import faker from "faker";

import { Book } from "../types";

type BuildModelDefinition<
  Definition extends Record<string, ModelValueType>,
  PrimaryKeyName extends keyof Definition
> = Omit<{ [Key in keyof Definition]: () => Definition[Key] }, PrimaryKeyName> &
  Record<
    PrimaryKeyName,
    Definition[PrimaryKeyName] extends PrimaryKeyType
      ? PrimaryKey<Definition[PrimaryKeyName]>
      : never
  >;

type Dictionary = {
  book: BuildModelDefinition<Book, "uuid">;
};

faker.seed(123);

export const db = factory<Dictionary>({
  book: {
    uuid: primaryKey(() => faker.datatype.uuid()),
    rating: () =>
      faker.datatype.number({
        min: 1,
        max: 5,
      }),
    name: () => `The ${faker.company.bsAdjective()} ${faker.animal.type()}`,
    review: () => faker.lorem.sentences(4),
  },
});

export function seedDb() {
  for (let i = 0; i < 5; i += 1) {
    db.book.create();
  }
}

export function getModelInstance<
  Model extends keyof Dictionary,
  PrimaryKeyName extends keyof Entity<Dictionary, "book">
>(model: Model, primaryKeyName: PrimaryKeyName) {
  const newModel = db[model].create();

  if (newModel[PRIMARY_KEY] !== primaryKeyName) {
    throw new Error(
      "the primary key supplied is not the correct primary key for the request model instance"
    );
  }

  db[model].delete({
    where: {
      [primaryKeyName]: {
        equals: newModel[primaryKeyName],
      },
    },
  });

  return newModel;
}
