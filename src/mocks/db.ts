import { factory, primaryKey } from "@mswjs/data";
import { ModelValueType, PrimaryKeyType } from "@mswjs/data/lib/glossary";
import { PrimaryKey } from "@mswjs/data/lib/primaryKey";
import faker from "faker";

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
    review: () => faker.lorem.sentence(),
  },
});

export function seedDb() {
  for (let i = 0; i < 5; i++) {
    db.book.create();
  }
}
