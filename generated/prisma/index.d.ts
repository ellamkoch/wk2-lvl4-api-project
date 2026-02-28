/**
 * Client
 **/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Class
 *
 */
export type Class = $Result.DefaultSelection<Prisma.$ClassPayload>;
/**
 * Model Entry
 *
 */
export type Entry = $Result.DefaultSelection<Prisma.$EntryPayload>;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(
    eventType: V,
    callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void,
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    'extends',
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.class`: Exposes CRUD operations for the **Class** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Classes
   * const classes = await prisma.class.findMany()
   * ```
   */
  get class(): Prisma.ClassDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.entry`: Exposes CRUD operations for the **Entry** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Entries
   * const entries = await prisma.entry.findMany()
   * ```
   */
  get entry(): Prisma.EntryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 7.4.1
   * Query Engine version: 55ae170b1ced7fc6ed07a15f110549408c501bb3
   */
  export type PrismaVersion = {
    client: string;
    engine: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import Bytes = runtime.Bytes;
  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<
    ReturnType<T>
  >;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown
    ? _Either<O, K, strict>
    : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (
    k: infer I,
  ) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> =
    IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<
    T,
    MaybeTupleToUnion<K>
  >;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    User: 'User';
    Class: 'Class';
    Entry: 'Entry';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<
    { extArgs: $Extensions.InternalArgs },
    $Utils.Record<string, any>
  > {
    returns: Prisma.TypeMap<
      this['params']['extArgs'],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps: 'user' | 'class' | 'entry';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      Class: {
        payload: Prisma.$ClassPayload<ExtArgs>;
        fields: Prisma.ClassFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ClassFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ClassFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>;
          };
          findFirst: {
            args: Prisma.ClassFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ClassFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>;
          };
          findMany: {
            args: Prisma.ClassFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[];
          };
          create: {
            args: Prisma.ClassCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>;
          };
          createMany: {
            args: Prisma.ClassCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ClassCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[];
          };
          delete: {
            args: Prisma.ClassDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>;
          };
          update: {
            args: Prisma.ClassUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>;
          };
          deleteMany: {
            args: Prisma.ClassDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ClassUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ClassUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[];
          };
          upsert: {
            args: Prisma.ClassUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>;
          };
          aggregate: {
            args: Prisma.ClassAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateClass>;
          };
          groupBy: {
            args: Prisma.ClassGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ClassGroupByOutputType>[];
          };
          count: {
            args: Prisma.ClassCountArgs<ExtArgs>;
            result: $Utils.Optional<ClassCountAggregateOutputType> | number;
          };
        };
      };
      Entry: {
        payload: Prisma.$EntryPayload<ExtArgs>;
        fields: Prisma.EntryFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.EntryFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EntryPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.EntryFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>;
          };
          findFirst: {
            args: Prisma.EntryFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EntryPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.EntryFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>;
          };
          findMany: {
            args: Prisma.EntryFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>[];
          };
          create: {
            args: Prisma.EntryCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>;
          };
          createMany: {
            args: Prisma.EntryCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.EntryCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>[];
          };
          delete: {
            args: Prisma.EntryDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>;
          };
          update: {
            args: Prisma.EntryUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>;
          };
          deleteMany: {
            args: Prisma.EntryDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.EntryUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.EntryUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>[];
          };
          upsert: {
            args: Prisma.EntryUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EntryPayload>;
          };
          aggregate: {
            args: Prisma.EntryAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateEntry>;
          };
          groupBy: {
            args: Prisma.EntryGroupByArgs<ExtArgs>;
            result: $Utils.Optional<EntryGroupByOutputType>[];
          };
          count: {
            args: Prisma.EntryCountArgs<ExtArgs>;
            result: $Utils.Optional<EntryCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory;
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string;
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
  }
  export type GlobalOmitConfig = {
    user?: UserOmit;
    class?: ClassOmit;
    entry?: EntryOmit;
  };

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;

  export type GetEvents<T extends any[]> =
    T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    classes: number;
    entries: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    classes?: boolean | UserCountOutputTypeCountClassesArgs;
    entries?: boolean | UserCountOutputTypeCountEntriesArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClassesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ClassWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEntriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: EntryWhereInput;
  };

  /**
   * Count Type ClassCountOutputType
   */

  export type ClassCountOutputType = {
    entries: number;
  };

  export type ClassCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    entries?: boolean | ClassCountOutputTypeCountEntriesArgs;
  };

  // Custom InputTypes
  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ClassCountOutputType
     */
    select?: ClassCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountEntriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: EntryWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    passwordHash: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    passwordHash: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    passwordHash: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: UserWhereInput;
      orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[];
      by: UserScalarFieldEnum[] | UserScalarFieldEnum;
      having?: UserScalarWhereWithAggregatesInput;
      take?: number;
      skip?: number;
      _count?: UserCountAggregateInputType | true;
      _min?: UserMinAggregateInputType;
      _max?: UserMaxAggregateInputType;
    };

  export type UserGroupByOutputType = {
    id: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        email?: boolean;
        passwordHash?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        classes?: boolean | User$classesArgs<ExtArgs>;
        entries?: boolean | User$entriesArgs<ExtArgs>;
        _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['user']
    >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      passwordHash?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      passwordHash?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'email' | 'passwordHash' | 'createdAt' | 'updatedAt',
      ExtArgs['result']['user']
    >;
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classes?: boolean | User$classesArgs<ExtArgs>;
    entries?: boolean | User$entriesArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type UserIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'User';
    objects: {
      classes: Prisma.$ClassPayload<ExtArgs>[];
      entries: Prisma.$EntryPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        email: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['user']
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<
    Prisma.$UserPayload,
    S
  >;

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    UserFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User']; meta: { name: 'User' } };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'createManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'updateManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    classes<T extends User$classesArgs<ExtArgs> = {}>(
      args?: Subset<T, User$classesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    entries<T extends User$entriesArgs<ExtArgs> = {}>(
      args?: Subset<T, User$entriesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<'User', 'String'>;
    readonly email: FieldRef<'User', 'String'>;
    readonly passwordHash: FieldRef<'User', 'String'>;
    readonly createdAt: FieldRef<'User', 'DateTime'>;
    readonly updatedAt: FieldRef<'User', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the User
       */
      omit?: UserOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: UserInclude<ExtArgs> | null;
      /**
       * Filter, which Users to fetch.
       */
      where?: UserWhereInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Users to fetch.
       */
      orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for listing Users.
       */
      cursor?: UserWhereUniqueInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Users from the position of the cursor.
       */
      take?: number;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Users.
       */
      skip?: number;
      distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
    };

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User.classes
   */
  export type User$classesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Class
       */
      select?: ClassSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Class
       */
      omit?: ClassOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ClassInclude<ExtArgs> | null;
      where?: ClassWhereInput;
      orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[];
      cursor?: ClassWhereUniqueInput;
      take?: number;
      skip?: number;
      distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[];
    };

  /**
   * User.entries
   */
  export type User$entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Entry
       */
      select?: EntrySelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Entry
       */
      omit?: EntryOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: EntryInclude<ExtArgs> | null;
      where?: EntryWhereInput;
      orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[];
      cursor?: EntryWhereUniqueInput;
      take?: number;
      skip?: number;
      distinct?: EntryScalarFieldEnum | EntryScalarFieldEnum[];
    };

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the User
       */
      omit?: UserOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: UserInclude<ExtArgs> | null;
    };

  /**
   * Model Class
   */

  export type AggregateClass = {
    _count: ClassCountAggregateOutputType | null;
    _min: ClassMinAggregateOutputType | null;
    _max: ClassMaxAggregateOutputType | null;
  };

  export type ClassMinAggregateOutputType = {
    id: string | null;
    className: string | null;
    authorId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ClassMaxAggregateOutputType = {
    id: string | null;
    className: string | null;
    authorId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ClassCountAggregateOutputType = {
    id: number;
    className: number;
    authorId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ClassMinAggregateInputType = {
    id?: true;
    className?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ClassMaxAggregateInputType = {
    id?: true;
    className?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ClassCountAggregateInputType = {
    id?: true;
    className?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ClassAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Class to aggregate.
     */
    where?: ClassWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ClassWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Classes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Classes
     **/
    _count?: true | ClassCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ClassMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ClassMaxAggregateInputType;
  };

  export type GetClassAggregateType<T extends ClassAggregateArgs> = {
    [P in keyof T & keyof AggregateClass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClass[P]>
      : GetScalarType<T[P], AggregateClass[P]>;
  };

  export type ClassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: ClassWhereInput;
      orderBy?: ClassOrderByWithAggregationInput | ClassOrderByWithAggregationInput[];
      by: ClassScalarFieldEnum[] | ClassScalarFieldEnum;
      having?: ClassScalarWhereWithAggregatesInput;
      take?: number;
      skip?: number;
      _count?: ClassCountAggregateInputType | true;
      _min?: ClassMinAggregateInputType;
      _max?: ClassMaxAggregateInputType;
    };

  export type ClassGroupByOutputType = {
    id: string;
    className: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: ClassCountAggregateOutputType | null;
    _min: ClassMinAggregateOutputType | null;
    _max: ClassMaxAggregateOutputType | null;
  };

  type GetClassGroupByPayload<T extends ClassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassGroupByOutputType, T['by']> & {
        [P in keyof T & keyof ClassGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ClassGroupByOutputType[P]>
          : GetScalarType<T[P], ClassGroupByOutputType[P]>;
      }
    >
  >;

  export type ClassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        className?: boolean;
        authorId?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        author?: boolean | UserDefaultArgs<ExtArgs>;
        entries?: boolean | Class$entriesArgs<ExtArgs>;
        _count?: boolean | ClassCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['class']
    >;

  export type ClassSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      className?: boolean;
      authorId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      author?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['class']
  >;

  export type ClassSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      className?: boolean;
      authorId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      author?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['class']
  >;

  export type ClassSelectScalar = {
    id?: boolean;
    className?: boolean;
    authorId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ClassOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'className' | 'authorId' | 'createdAt' | 'updatedAt',
      ExtArgs['result']['class']
    >;
  export type ClassInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>;
    entries?: boolean | Class$entriesArgs<ExtArgs>;
    _count?: boolean | ClassCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ClassIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    author?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type ClassIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    author?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $ClassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'Class';
    objects: {
      author: Prisma.$UserPayload<ExtArgs>;
      entries: Prisma.$EntryPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        className: string;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['class']
    >;
    composites: {};
  };

  type ClassGetPayload<S extends boolean | null | undefined | ClassDefaultArgs> = $Result.GetResult<
    Prisma.$ClassPayload,
    S
  >;

  type ClassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    ClassFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: ClassCountAggregateInputType | true;
  };

  export interface ClassDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Class']; meta: { name: 'Class' } };
    /**
     * Find zero or one Class that matches the filter.
     * @param {ClassFindUniqueArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassFindUniqueArgs>(
      args: SelectSubset<T, ClassFindUniqueArgs<ExtArgs>>,
    ): Prisma__ClassClient<
      $Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Class that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClassFindUniqueOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ClassFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ClassClient<
      $Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Class that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassFindFirstArgs>(
      args?: SelectSubset<T, ClassFindFirstArgs<ExtArgs>>,
    ): Prisma__ClassClient<
      $Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Class that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ClassFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ClassClient<
      $Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Classes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classes
     * const classes = await prisma.class.findMany()
     *
     * // Get first 10 Classes
     * const classes = await prisma.class.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const classWithIdOnly = await prisma.class.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ClassFindManyArgs>(
      args?: SelectSubset<T, ClassFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Class.
     * @param {ClassCreateArgs} args - Arguments to create a Class.
     * @example
     * // Create one Class
     * const Class = await prisma.class.create({
     *   data: {
     *     // ... data to create a Class
     *   }
     * })
     *
     */
    create<T extends ClassCreateArgs>(
      args: SelectSubset<T, ClassCreateArgs<ExtArgs>>,
    ): Prisma__ClassClient<
      $Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Classes.
     * @param {ClassCreateManyArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ClassCreateManyArgs>(
      args?: SelectSubset<T, ClassCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Classes and returns the data saved in the database.
     * @param {ClassCreateManyAndReturnArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Classes and only return the `id`
     * const classWithIdOnly = await prisma.class.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ClassCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ClassCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, 'createManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Delete a Class.
     * @param {ClassDeleteArgs} args - Arguments to delete one Class.
     * @example
     * // Delete one Class
     * const Class = await prisma.class.delete({
     *   where: {
     *     // ... filter to delete one Class
     *   }
     * })
     *
     */
    delete<T extends ClassDeleteArgs>(
      args: SelectSubset<T, ClassDeleteArgs<ExtArgs>>,
    ): Prisma__ClassClient<
      $Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Class.
     * @param {ClassUpdateArgs} args - Arguments to update one Class.
     * @example
     * // Update one Class
     * const class = await prisma.class.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ClassUpdateArgs>(
      args: SelectSubset<T, ClassUpdateArgs<ExtArgs>>,
    ): Prisma__ClassClient<
      $Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Classes.
     * @param {ClassDeleteManyArgs} args - Arguments to filter Classes to delete.
     * @example
     * // Delete a few Classes
     * const { count } = await prisma.class.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ClassDeleteManyArgs>(
      args?: SelectSubset<T, ClassDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classes
     * const class = await prisma.class.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ClassUpdateManyArgs>(
      args: SelectSubset<T, ClassUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Classes and returns the data updated in the database.
     * @param {ClassUpdateManyAndReturnArgs} args - Arguments to update many Classes.
     * @example
     * // Update many Classes
     * const class = await prisma.class.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Classes and only return the `id`
     * const classWithIdOnly = await prisma.class.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ClassUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ClassUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, 'updateManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Create or update one Class.
     * @param {ClassUpsertArgs} args - Arguments to update or create a Class.
     * @example
     * // Update or create a Class
     * const class = await prisma.class.upsert({
     *   create: {
     *     // ... data to create a Class
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Class we want to update
     *   }
     * })
     */
    upsert<T extends ClassUpsertArgs>(
      args: SelectSubset<T, ClassUpsertArgs<ExtArgs>>,
    ): Prisma__ClassClient<
      $Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassCountArgs} args - Arguments to filter Classes to count.
     * @example
     * // Count the number of Classes
     * const count = await prisma.class.count({
     *   where: {
     *     // ... the filter for the Classes we want to count
     *   }
     * })
     **/
    count<T extends ClassCountArgs>(
      args?: Subset<T, ClassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ClassAggregateArgs>(
      args: Subset<T, ClassAggregateArgs>,
    ): Prisma.PrismaPromise<GetClassAggregateType<T>>;

    /**
     * Group by Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ClassGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassGroupByArgs['orderBy'] }
        : { orderBy?: ClassGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ClassGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetClassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Class model
     */
    readonly fields: ClassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Class.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    author<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    entries<T extends Class$entriesArgs<ExtArgs> = {}>(
      args?: Subset<T, Class$entriesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Class model
   */
  interface ClassFieldRefs {
    readonly id: FieldRef<'Class', 'String'>;
    readonly className: FieldRef<'Class', 'String'>;
    readonly authorId: FieldRef<'Class', 'String'>;
    readonly createdAt: FieldRef<'Class', 'DateTime'>;
    readonly updatedAt: FieldRef<'Class', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Class findUnique
   */
  export type ClassFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null;
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput;
  };

  /**
   * Class findUniqueOrThrow
   */
  export type ClassFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null;
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput;
  };

  /**
   * Class findFirst
   */
  export type ClassFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null;
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Classes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[];
  };

  /**
   * Class findFirstOrThrow
   */
  export type ClassFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null;
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Classes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[];
  };

  /**
   * Class findMany
   */
  export type ClassFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null;
    /**
     * Filter, which Classes to fetch.
     */
    where?: ClassWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Classes.
     */
    cursor?: ClassWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Classes.
     */
    skip?: number;
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[];
  };

  /**
   * Class create
   */
  export type ClassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Class
       */
      select?: ClassSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Class
       */
      omit?: ClassOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ClassInclude<ExtArgs> | null;
      /**
       * The data needed to create a Class.
       */
      data: XOR<ClassCreateInput, ClassUncheckedCreateInput>;
    };

  /**
   * Class createMany
   */
  export type ClassCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Class createManyAndReturn
   */
  export type ClassCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null;
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Class update
   */
  export type ClassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Class
       */
      select?: ClassSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Class
       */
      omit?: ClassOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ClassInclude<ExtArgs> | null;
      /**
       * The data needed to update a Class.
       */
      data: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>;
      /**
       * Choose, which Class to update.
       */
      where: ClassWhereUniqueInput;
    };

  /**
   * Class updateMany
   */
  export type ClassUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Classes.
     */
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyInput>;
    /**
     * Filter which Classes to update
     */
    where?: ClassWhereInput;
    /**
     * Limit how many Classes to update.
     */
    limit?: number;
  };

  /**
   * Class updateManyAndReturn
   */
  export type ClassUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null;
    /**
     * The data used to update Classes.
     */
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyInput>;
    /**
     * Filter which Classes to update
     */
    where?: ClassWhereInput;
    /**
     * Limit how many Classes to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Class upsert
   */
  export type ClassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Class
       */
      select?: ClassSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Class
       */
      omit?: ClassOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ClassInclude<ExtArgs> | null;
      /**
       * The filter to search for the Class to update in case it exists.
       */
      where: ClassWhereUniqueInput;
      /**
       * In case the Class found by the `where` argument doesn't exist, create a new Class with this data.
       */
      create: XOR<ClassCreateInput, ClassUncheckedCreateInput>;
      /**
       * In case the Class was found with the provided `where` argument, update it with this data.
       */
      update: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>;
    };

  /**
   * Class delete
   */
  export type ClassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Class
       */
      select?: ClassSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Class
       */
      omit?: ClassOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ClassInclude<ExtArgs> | null;
      /**
       * Filter which Class to delete.
       */
      where: ClassWhereUniqueInput;
    };

  /**
   * Class deleteMany
   */
  export type ClassDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Classes to delete
     */
    where?: ClassWhereInput;
    /**
     * Limit how many Classes to delete.
     */
    limit?: number;
  };

  /**
   * Class.entries
   */
  export type Class$entriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null;
    where?: EntryWhereInput;
    orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[];
    cursor?: EntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: EntryScalarFieldEnum | EntryScalarFieldEnum[];
  };

  /**
   * Class without action
   */
  export type ClassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Class
       */
      select?: ClassSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Class
       */
      omit?: ClassOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: ClassInclude<ExtArgs> | null;
    };

  /**
   * Model Entry
   */

  export type AggregateEntry = {
    _count: EntryCountAggregateOutputType | null;
    _min: EntryMinAggregateOutputType | null;
    _max: EntryMaxAggregateOutputType | null;
  };

  export type EntryMinAggregateOutputType = {
    id: string | null;
    horseName: string | null;
    classId: string | null;
    authorId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type EntryMaxAggregateOutputType = {
    id: string | null;
    horseName: string | null;
    classId: string | null;
    authorId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type EntryCountAggregateOutputType = {
    id: number;
    horseName: number;
    classId: number;
    authorId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type EntryMinAggregateInputType = {
    id?: true;
    horseName?: true;
    classId?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type EntryMaxAggregateInputType = {
    id?: true;
    horseName?: true;
    classId?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type EntryCountAggregateInputType = {
    id?: true;
    horseName?: true;
    classId?: true;
    authorId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type EntryAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Entry to aggregate.
     */
    where?: EntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Entries to fetch.
     */
    orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: EntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Entries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Entries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Entries
     **/
    _count?: true | EntryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: EntryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: EntryMaxAggregateInputType;
  };

  export type GetEntryAggregateType<T extends EntryAggregateArgs> = {
    [P in keyof T & keyof AggregateEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEntry[P]>
      : GetScalarType<T[P], AggregateEntry[P]>;
  };

  export type EntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: EntryWhereInput;
      orderBy?: EntryOrderByWithAggregationInput | EntryOrderByWithAggregationInput[];
      by: EntryScalarFieldEnum[] | EntryScalarFieldEnum;
      having?: EntryScalarWhereWithAggregatesInput;
      take?: number;
      skip?: number;
      _count?: EntryCountAggregateInputType | true;
      _min?: EntryMinAggregateInputType;
      _max?: EntryMaxAggregateInputType;
    };

  export type EntryGroupByOutputType = {
    id: string;
    horseName: string;
    classId: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: EntryCountAggregateOutputType | null;
    _min: EntryMinAggregateOutputType | null;
    _max: EntryMaxAggregateOutputType | null;
  };

  type GetEntryGroupByPayload<T extends EntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EntryGroupByOutputType, T['by']> & {
        [P in keyof T & keyof EntryGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], EntryGroupByOutputType[P]>
          : GetScalarType<T[P], EntryGroupByOutputType[P]>;
      }
    >
  >;

  export type EntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        horseName?: boolean;
        classId?: boolean;
        authorId?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        class?: boolean | ClassDefaultArgs<ExtArgs>;
        author?: boolean | UserDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['entry']
    >;

  export type EntrySelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      horseName?: boolean;
      classId?: boolean;
      authorId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      class?: boolean | ClassDefaultArgs<ExtArgs>;
      author?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['entry']
  >;

  export type EntrySelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      horseName?: boolean;
      classId?: boolean;
      authorId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      class?: boolean | ClassDefaultArgs<ExtArgs>;
      author?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['entry']
  >;

  export type EntrySelectScalar = {
    id?: boolean;
    horseName?: boolean;
    classId?: boolean;
    authorId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type EntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'horseName' | 'classId' | 'authorId' | 'createdAt' | 'updatedAt',
      ExtArgs['result']['entry']
    >;
  export type EntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>;
    author?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type EntryIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    class?: boolean | ClassDefaultArgs<ExtArgs>;
    author?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type EntryIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    class?: boolean | ClassDefaultArgs<ExtArgs>;
    author?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $EntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'Entry';
    objects: {
      class: Prisma.$ClassPayload<ExtArgs>;
      author: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        horseName: string;
        classId: string;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['entry']
    >;
    composites: {};
  };

  type EntryGetPayload<S extends boolean | null | undefined | EntryDefaultArgs> = $Result.GetResult<
    Prisma.$EntryPayload,
    S
  >;

  type EntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    EntryFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: EntryCountAggregateInputType | true;
  };

  export interface EntryDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Entry']; meta: { name: 'Entry' } };
    /**
     * Find zero or one Entry that matches the filter.
     * @param {EntryFindUniqueArgs} args - Arguments to find a Entry
     * @example
     * // Get one Entry
     * const entry = await prisma.entry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EntryFindUniqueArgs>(
      args: SelectSubset<T, EntryFindUniqueArgs<ExtArgs>>,
    ): Prisma__EntryClient<
      $Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Entry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EntryFindUniqueOrThrowArgs} args - Arguments to find a Entry
     * @example
     * // Get one Entry
     * const entry = await prisma.entry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EntryFindUniqueOrThrowArgs>(
      args: SelectSubset<T, EntryFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__EntryClient<
      $Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Entry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryFindFirstArgs} args - Arguments to find a Entry
     * @example
     * // Get one Entry
     * const entry = await prisma.entry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EntryFindFirstArgs>(
      args?: SelectSubset<T, EntryFindFirstArgs<ExtArgs>>,
    ): Prisma__EntryClient<
      $Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Entry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryFindFirstOrThrowArgs} args - Arguments to find a Entry
     * @example
     * // Get one Entry
     * const entry = await prisma.entry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EntryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, EntryFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__EntryClient<
      $Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Entries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Entries
     * const entries = await prisma.entry.findMany()
     *
     * // Get first 10 Entries
     * const entries = await prisma.entry.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const entryWithIdOnly = await prisma.entry.findMany({ select: { id: true } })
     *
     */
    findMany<T extends EntryFindManyArgs>(
      args?: SelectSubset<T, EntryFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Entry.
     * @param {EntryCreateArgs} args - Arguments to create a Entry.
     * @example
     * // Create one Entry
     * const Entry = await prisma.entry.create({
     *   data: {
     *     // ... data to create a Entry
     *   }
     * })
     *
     */
    create<T extends EntryCreateArgs>(
      args: SelectSubset<T, EntryCreateArgs<ExtArgs>>,
    ): Prisma__EntryClient<
      $Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Entries.
     * @param {EntryCreateManyArgs} args - Arguments to create many Entries.
     * @example
     * // Create many Entries
     * const entry = await prisma.entry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends EntryCreateManyArgs>(
      args?: SelectSubset<T, EntryCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Entries and returns the data saved in the database.
     * @param {EntryCreateManyAndReturnArgs} args - Arguments to create many Entries.
     * @example
     * // Create many Entries
     * const entry = await prisma.entry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Entries and only return the `id`
     * const entryWithIdOnly = await prisma.entry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends EntryCreateManyAndReturnArgs>(
      args?: SelectSubset<T, EntryCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, 'createManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Delete a Entry.
     * @param {EntryDeleteArgs} args - Arguments to delete one Entry.
     * @example
     * // Delete one Entry
     * const Entry = await prisma.entry.delete({
     *   where: {
     *     // ... filter to delete one Entry
     *   }
     * })
     *
     */
    delete<T extends EntryDeleteArgs>(
      args: SelectSubset<T, EntryDeleteArgs<ExtArgs>>,
    ): Prisma__EntryClient<
      $Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Entry.
     * @param {EntryUpdateArgs} args - Arguments to update one Entry.
     * @example
     * // Update one Entry
     * const entry = await prisma.entry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends EntryUpdateArgs>(
      args: SelectSubset<T, EntryUpdateArgs<ExtArgs>>,
    ): Prisma__EntryClient<
      $Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Entries.
     * @param {EntryDeleteManyArgs} args - Arguments to filter Entries to delete.
     * @example
     * // Delete a few Entries
     * const { count } = await prisma.entry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends EntryDeleteManyArgs>(
      args?: SelectSubset<T, EntryDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Entries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Entries
     * const entry = await prisma.entry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends EntryUpdateManyArgs>(
      args: SelectSubset<T, EntryUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Entries and returns the data updated in the database.
     * @param {EntryUpdateManyAndReturnArgs} args - Arguments to update many Entries.
     * @example
     * // Update many Entries
     * const entry = await prisma.entry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Entries and only return the `id`
     * const entryWithIdOnly = await prisma.entry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends EntryUpdateManyAndReturnArgs>(
      args: SelectSubset<T, EntryUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, 'updateManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Create or update one Entry.
     * @param {EntryUpsertArgs} args - Arguments to update or create a Entry.
     * @example
     * // Update or create a Entry
     * const entry = await prisma.entry.upsert({
     *   create: {
     *     // ... data to create a Entry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Entry we want to update
     *   }
     * })
     */
    upsert<T extends EntryUpsertArgs>(
      args: SelectSubset<T, EntryUpsertArgs<ExtArgs>>,
    ): Prisma__EntryClient<
      $Result.GetResult<Prisma.$EntryPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Entries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryCountArgs} args - Arguments to filter Entries to count.
     * @example
     * // Count the number of Entries
     * const count = await prisma.entry.count({
     *   where: {
     *     // ... the filter for the Entries we want to count
     *   }
     * })
     **/
    count<T extends EntryCountArgs>(
      args?: Subset<T, EntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EntryCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Entry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends EntryAggregateArgs>(
      args: Subset<T, EntryAggregateArgs>,
    ): Prisma.PrismaPromise<GetEntryAggregateType<T>>;

    /**
     * Group by Entry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends EntryGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EntryGroupByArgs['orderBy'] }
        : { orderBy?: EntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, EntryGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Entry model
     */
    readonly fields: EntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Entry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EntryClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    class<T extends ClassDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ClassDefaultArgs<ExtArgs>>,
    ): Prisma__ClassClient<
      | $Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    author<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Entry model
   */
  interface EntryFieldRefs {
    readonly id: FieldRef<'Entry', 'String'>;
    readonly horseName: FieldRef<'Entry', 'String'>;
    readonly classId: FieldRef<'Entry', 'String'>;
    readonly authorId: FieldRef<'Entry', 'String'>;
    readonly createdAt: FieldRef<'Entry', 'DateTime'>;
    readonly updatedAt: FieldRef<'Entry', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Entry findUnique
   */
  export type EntryFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null;
    /**
     * Filter, which Entry to fetch.
     */
    where: EntryWhereUniqueInput;
  };

  /**
   * Entry findUniqueOrThrow
   */
  export type EntryFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null;
    /**
     * Filter, which Entry to fetch.
     */
    where: EntryWhereUniqueInput;
  };

  /**
   * Entry findFirst
   */
  export type EntryFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null;
    /**
     * Filter, which Entry to fetch.
     */
    where?: EntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Entries to fetch.
     */
    orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Entries.
     */
    cursor?: EntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Entries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Entries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Entries.
     */
    distinct?: EntryScalarFieldEnum | EntryScalarFieldEnum[];
  };

  /**
   * Entry findFirstOrThrow
   */
  export type EntryFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null;
    /**
     * Filter, which Entry to fetch.
     */
    where?: EntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Entries to fetch.
     */
    orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Entries.
     */
    cursor?: EntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Entries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Entries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Entries.
     */
    distinct?: EntryScalarFieldEnum | EntryScalarFieldEnum[];
  };

  /**
   * Entry findMany
   */
  export type EntryFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryInclude<ExtArgs> | null;
    /**
     * Filter, which Entries to fetch.
     */
    where?: EntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Entries to fetch.
     */
    orderBy?: EntryOrderByWithRelationInput | EntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Entries.
     */
    cursor?: EntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Entries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Entries.
     */
    skip?: number;
    distinct?: EntryScalarFieldEnum | EntryScalarFieldEnum[];
  };

  /**
   * Entry create
   */
  export type EntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Entry
       */
      select?: EntrySelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Entry
       */
      omit?: EntryOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: EntryInclude<ExtArgs> | null;
      /**
       * The data needed to create a Entry.
       */
      data: XOR<EntryCreateInput, EntryUncheckedCreateInput>;
    };

  /**
   * Entry createMany
   */
  export type EntryCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Entries.
     */
    data: EntryCreateManyInput | EntryCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Entry createManyAndReturn
   */
  export type EntryCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null;
    /**
     * The data used to create many Entries.
     */
    data: EntryCreateManyInput | EntryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Entry update
   */
  export type EntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Entry
       */
      select?: EntrySelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Entry
       */
      omit?: EntryOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: EntryInclude<ExtArgs> | null;
      /**
       * The data needed to update a Entry.
       */
      data: XOR<EntryUpdateInput, EntryUncheckedUpdateInput>;
      /**
       * Choose, which Entry to update.
       */
      where: EntryWhereUniqueInput;
    };

  /**
   * Entry updateMany
   */
  export type EntryUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Entries.
     */
    data: XOR<EntryUpdateManyMutationInput, EntryUncheckedUpdateManyInput>;
    /**
     * Filter which Entries to update
     */
    where?: EntryWhereInput;
    /**
     * Limit how many Entries to update.
     */
    limit?: number;
  };

  /**
   * Entry updateManyAndReturn
   */
  export type EntryUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Entry
     */
    select?: EntrySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Entry
     */
    omit?: EntryOmit<ExtArgs> | null;
    /**
     * The data used to update Entries.
     */
    data: XOR<EntryUpdateManyMutationInput, EntryUncheckedUpdateManyInput>;
    /**
     * Filter which Entries to update
     */
    where?: EntryWhereInput;
    /**
     * Limit how many Entries to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Entry upsert
   */
  export type EntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Entry
       */
      select?: EntrySelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Entry
       */
      omit?: EntryOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: EntryInclude<ExtArgs> | null;
      /**
       * The filter to search for the Entry to update in case it exists.
       */
      where: EntryWhereUniqueInput;
      /**
       * In case the Entry found by the `where` argument doesn't exist, create a new Entry with this data.
       */
      create: XOR<EntryCreateInput, EntryUncheckedCreateInput>;
      /**
       * In case the Entry was found with the provided `where` argument, update it with this data.
       */
      update: XOR<EntryUpdateInput, EntryUncheckedUpdateInput>;
    };

  /**
   * Entry delete
   */
  export type EntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Entry
       */
      select?: EntrySelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Entry
       */
      omit?: EntryOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: EntryInclude<ExtArgs> | null;
      /**
       * Filter which Entry to delete.
       */
      where: EntryWhereUniqueInput;
    };

  /**
   * Entry deleteMany
   */
  export type EntryDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Entries to delete
     */
    where?: EntryWhereInput;
    /**
     * Limit how many Entries to delete.
     */
    limit?: number;
  };

  /**
   * Entry without action
   */
  export type EntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the Entry
       */
      select?: EntrySelect<ExtArgs> | null;
      /**
       * Omit specific fields from the Entry
       */
      omit?: EntryOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: EntryInclude<ExtArgs> | null;
    };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum: {
    id: 'id';
    email: 'email';
    passwordHash: 'passwordHash';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const ClassScalarFieldEnum: {
    id: 'id';
    className: 'className';
    authorId: 'authorId';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type ClassScalarFieldEnum =
    (typeof ClassScalarFieldEnum)[keyof typeof ClassScalarFieldEnum];

  export const EntryScalarFieldEnum: {
    id: 'id';
    horseName: 'horseName';
    classId: 'classId';
    authorId: 'authorId';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type EntryScalarFieldEnum =
    (typeof EntryScalarFieldEnum)[keyof typeof EntryScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<'User'> | string;
    email?: StringFilter<'User'> | string;
    passwordHash?: StringFilter<'User'> | string;
    createdAt?: DateTimeFilter<'User'> | Date | string;
    updatedAt?: DateTimeFilter<'User'> | Date | string;
    classes?: ClassListRelationFilter;
    entries?: EntryListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    classes?: ClassOrderByRelationAggregateInput;
    entries?: EntryOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      passwordHash?: StringFilter<'User'> | string;
      createdAt?: DateTimeFilter<'User'> | Date | string;
      updatedAt?: DateTimeFilter<'User'> | Date | string;
      classes?: ClassListRelationFilter;
      entries?: EntryListRelationFilter;
    },
    'id' | 'email'
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'User'> | string;
    email?: StringWithAggregatesFilter<'User'> | string;
    passwordHash?: StringWithAggregatesFilter<'User'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
  };

  export type ClassWhereInput = {
    AND?: ClassWhereInput | ClassWhereInput[];
    OR?: ClassWhereInput[];
    NOT?: ClassWhereInput | ClassWhereInput[];
    id?: StringFilter<'Class'> | string;
    className?: StringFilter<'Class'> | string;
    authorId?: StringFilter<'Class'> | string;
    createdAt?: DateTimeFilter<'Class'> | Date | string;
    updatedAt?: DateTimeFilter<'Class'> | Date | string;
    author?: XOR<UserScalarRelationFilter, UserWhereInput>;
    entries?: EntryListRelationFilter;
  };

  export type ClassOrderByWithRelationInput = {
    id?: SortOrder;
    className?: SortOrder;
    authorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    author?: UserOrderByWithRelationInput;
    entries?: EntryOrderByRelationAggregateInput;
  };

  export type ClassWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ClassWhereInput | ClassWhereInput[];
      OR?: ClassWhereInput[];
      NOT?: ClassWhereInput | ClassWhereInput[];
      className?: StringFilter<'Class'> | string;
      authorId?: StringFilter<'Class'> | string;
      createdAt?: DateTimeFilter<'Class'> | Date | string;
      updatedAt?: DateTimeFilter<'Class'> | Date | string;
      author?: XOR<UserScalarRelationFilter, UserWhereInput>;
      entries?: EntryListRelationFilter;
    },
    'id'
  >;

  export type ClassOrderByWithAggregationInput = {
    id?: SortOrder;
    className?: SortOrder;
    authorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ClassCountOrderByAggregateInput;
    _max?: ClassMaxOrderByAggregateInput;
    _min?: ClassMinOrderByAggregateInput;
  };

  export type ClassScalarWhereWithAggregatesInput = {
    AND?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[];
    OR?: ClassScalarWhereWithAggregatesInput[];
    NOT?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Class'> | string;
    className?: StringWithAggregatesFilter<'Class'> | string;
    authorId?: StringWithAggregatesFilter<'Class'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'Class'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Class'> | Date | string;
  };

  export type EntryWhereInput = {
    AND?: EntryWhereInput | EntryWhereInput[];
    OR?: EntryWhereInput[];
    NOT?: EntryWhereInput | EntryWhereInput[];
    id?: StringFilter<'Entry'> | string;
    horseName?: StringFilter<'Entry'> | string;
    classId?: StringFilter<'Entry'> | string;
    authorId?: StringFilter<'Entry'> | string;
    createdAt?: DateTimeFilter<'Entry'> | Date | string;
    updatedAt?: DateTimeFilter<'Entry'> | Date | string;
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>;
    author?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type EntryOrderByWithRelationInput = {
    id?: SortOrder;
    horseName?: SortOrder;
    classId?: SortOrder;
    authorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    class?: ClassOrderByWithRelationInput;
    author?: UserOrderByWithRelationInput;
  };

  export type EntryWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: EntryWhereInput | EntryWhereInput[];
      OR?: EntryWhereInput[];
      NOT?: EntryWhereInput | EntryWhereInput[];
      horseName?: StringFilter<'Entry'> | string;
      classId?: StringFilter<'Entry'> | string;
      authorId?: StringFilter<'Entry'> | string;
      createdAt?: DateTimeFilter<'Entry'> | Date | string;
      updatedAt?: DateTimeFilter<'Entry'> | Date | string;
      class?: XOR<ClassScalarRelationFilter, ClassWhereInput>;
      author?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'id'
  >;

  export type EntryOrderByWithAggregationInput = {
    id?: SortOrder;
    horseName?: SortOrder;
    classId?: SortOrder;
    authorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: EntryCountOrderByAggregateInput;
    _max?: EntryMaxOrderByAggregateInput;
    _min?: EntryMinOrderByAggregateInput;
  };

  export type EntryScalarWhereWithAggregatesInput = {
    AND?: EntryScalarWhereWithAggregatesInput | EntryScalarWhereWithAggregatesInput[];
    OR?: EntryScalarWhereWithAggregatesInput[];
    NOT?: EntryScalarWhereWithAggregatesInput | EntryScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Entry'> | string;
    horseName?: StringWithAggregatesFilter<'Entry'> | string;
    classId?: StringWithAggregatesFilter<'Entry'> | string;
    authorId?: StringWithAggregatesFilter<'Entry'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'Entry'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Entry'> | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classes?: ClassCreateNestedManyWithoutAuthorInput;
    entries?: EntryCreateNestedManyWithoutAuthorInput;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classes?: ClassUncheckedCreateNestedManyWithoutAuthorInput;
    entries?: EntryUncheckedCreateNestedManyWithoutAuthorInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    classes?: ClassUpdateManyWithoutAuthorNestedInput;
    entries?: EntryUpdateManyWithoutAuthorNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    classes?: ClassUncheckedUpdateManyWithoutAuthorNestedInput;
    entries?: EntryUncheckedUpdateManyWithoutAuthorNestedInput;
  };

  export type UserCreateManyInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ClassCreateInput = {
    id?: string;
    className: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: UserCreateNestedOneWithoutClassesInput;
    entries?: EntryCreateNestedManyWithoutClassInput;
  };

  export type ClassUncheckedCreateInput = {
    id?: string;
    className: string;
    authorId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entries?: EntryUncheckedCreateNestedManyWithoutClassInput;
  };

  export type ClassUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    className?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    author?: UserUpdateOneRequiredWithoutClassesNestedInput;
    entries?: EntryUpdateManyWithoutClassNestedInput;
  };

  export type ClassUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    className?: StringFieldUpdateOperationsInput | string;
    authorId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    entries?: EntryUncheckedUpdateManyWithoutClassNestedInput;
  };

  export type ClassCreateManyInput = {
    id?: string;
    className: string;
    authorId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ClassUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    className?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ClassUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    className?: StringFieldUpdateOperationsInput | string;
    authorId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EntryCreateInput = {
    id?: string;
    horseName: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    class: ClassCreateNestedOneWithoutEntriesInput;
    author: UserCreateNestedOneWithoutEntriesInput;
  };

  export type EntryUncheckedCreateInput = {
    id?: string;
    horseName: string;
    classId: string;
    authorId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    horseName?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    class?: ClassUpdateOneRequiredWithoutEntriesNestedInput;
    author?: UserUpdateOneRequiredWithoutEntriesNestedInput;
  };

  export type EntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    horseName?: StringFieldUpdateOperationsInput | string;
    classId?: StringFieldUpdateOperationsInput | string;
    authorId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EntryCreateManyInput = {
    id?: string;
    horseName: string;
    classId: string;
    authorId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    horseName?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    horseName?: StringFieldUpdateOperationsInput | string;
    classId?: StringFieldUpdateOperationsInput | string;
    authorId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type ClassListRelationFilter = {
    every?: ClassWhereInput;
    some?: ClassWhereInput;
    none?: ClassWhereInput;
  };

  export type EntryListRelationFilter = {
    every?: EntryWhereInput;
    some?: EntryWhereInput;
    none?: EntryWhereInput;
  };

  export type ClassOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type EntryOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type UserScalarRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type ClassCountOrderByAggregateInput = {
    id?: SortOrder;
    className?: SortOrder;
    authorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ClassMaxOrderByAggregateInput = {
    id?: SortOrder;
    className?: SortOrder;
    authorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ClassMinOrderByAggregateInput = {
    id?: SortOrder;
    className?: SortOrder;
    authorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ClassScalarRelationFilter = {
    is?: ClassWhereInput;
    isNot?: ClassWhereInput;
  };

  export type EntryCountOrderByAggregateInput = {
    id?: SortOrder;
    horseName?: SortOrder;
    classId?: SortOrder;
    authorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EntryMaxOrderByAggregateInput = {
    id?: SortOrder;
    horseName?: SortOrder;
    classId?: SortOrder;
    authorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EntryMinOrderByAggregateInput = {
    id?: SortOrder;
    horseName?: SortOrder;
    classId?: SortOrder;
    authorId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ClassCreateNestedManyWithoutAuthorInput = {
    create?:
      | XOR<ClassCreateWithoutAuthorInput, ClassUncheckedCreateWithoutAuthorInput>
      | ClassCreateWithoutAuthorInput[]
      | ClassUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?:
      | ClassCreateOrConnectWithoutAuthorInput
      | ClassCreateOrConnectWithoutAuthorInput[];
    createMany?: ClassCreateManyAuthorInputEnvelope;
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[];
  };

  export type EntryCreateNestedManyWithoutAuthorInput = {
    create?:
      | XOR<EntryCreateWithoutAuthorInput, EntryUncheckedCreateWithoutAuthorInput>
      | EntryCreateWithoutAuthorInput[]
      | EntryUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?:
      | EntryCreateOrConnectWithoutAuthorInput
      | EntryCreateOrConnectWithoutAuthorInput[];
    createMany?: EntryCreateManyAuthorInputEnvelope;
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
  };

  export type ClassUncheckedCreateNestedManyWithoutAuthorInput = {
    create?:
      | XOR<ClassCreateWithoutAuthorInput, ClassUncheckedCreateWithoutAuthorInput>
      | ClassCreateWithoutAuthorInput[]
      | ClassUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?:
      | ClassCreateOrConnectWithoutAuthorInput
      | ClassCreateOrConnectWithoutAuthorInput[];
    createMany?: ClassCreateManyAuthorInputEnvelope;
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[];
  };

  export type EntryUncheckedCreateNestedManyWithoutAuthorInput = {
    create?:
      | XOR<EntryCreateWithoutAuthorInput, EntryUncheckedCreateWithoutAuthorInput>
      | EntryCreateWithoutAuthorInput[]
      | EntryUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?:
      | EntryCreateOrConnectWithoutAuthorInput
      | EntryCreateOrConnectWithoutAuthorInput[];
    createMany?: EntryCreateManyAuthorInputEnvelope;
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type ClassUpdateManyWithoutAuthorNestedInput = {
    create?:
      | XOR<ClassCreateWithoutAuthorInput, ClassUncheckedCreateWithoutAuthorInput>
      | ClassCreateWithoutAuthorInput[]
      | ClassUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?:
      | ClassCreateOrConnectWithoutAuthorInput
      | ClassCreateOrConnectWithoutAuthorInput[];
    upsert?:
      | ClassUpsertWithWhereUniqueWithoutAuthorInput
      | ClassUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: ClassCreateManyAuthorInputEnvelope;
    set?: ClassWhereUniqueInput | ClassWhereUniqueInput[];
    disconnect?: ClassWhereUniqueInput | ClassWhereUniqueInput[];
    delete?: ClassWhereUniqueInput | ClassWhereUniqueInput[];
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[];
    update?:
      | ClassUpdateWithWhereUniqueWithoutAuthorInput
      | ClassUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?:
      | ClassUpdateManyWithWhereWithoutAuthorInput
      | ClassUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: ClassScalarWhereInput | ClassScalarWhereInput[];
  };

  export type EntryUpdateManyWithoutAuthorNestedInput = {
    create?:
      | XOR<EntryCreateWithoutAuthorInput, EntryUncheckedCreateWithoutAuthorInput>
      | EntryCreateWithoutAuthorInput[]
      | EntryUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?:
      | EntryCreateOrConnectWithoutAuthorInput
      | EntryCreateOrConnectWithoutAuthorInput[];
    upsert?:
      | EntryUpsertWithWhereUniqueWithoutAuthorInput
      | EntryUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: EntryCreateManyAuthorInputEnvelope;
    set?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
    disconnect?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
    delete?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
    update?:
      | EntryUpdateWithWhereUniqueWithoutAuthorInput
      | EntryUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?:
      | EntryUpdateManyWithWhereWithoutAuthorInput
      | EntryUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: EntryScalarWhereInput | EntryScalarWhereInput[];
  };

  export type ClassUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?:
      | XOR<ClassCreateWithoutAuthorInput, ClassUncheckedCreateWithoutAuthorInput>
      | ClassCreateWithoutAuthorInput[]
      | ClassUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?:
      | ClassCreateOrConnectWithoutAuthorInput
      | ClassCreateOrConnectWithoutAuthorInput[];
    upsert?:
      | ClassUpsertWithWhereUniqueWithoutAuthorInput
      | ClassUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: ClassCreateManyAuthorInputEnvelope;
    set?: ClassWhereUniqueInput | ClassWhereUniqueInput[];
    disconnect?: ClassWhereUniqueInput | ClassWhereUniqueInput[];
    delete?: ClassWhereUniqueInput | ClassWhereUniqueInput[];
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[];
    update?:
      | ClassUpdateWithWhereUniqueWithoutAuthorInput
      | ClassUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?:
      | ClassUpdateManyWithWhereWithoutAuthorInput
      | ClassUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: ClassScalarWhereInput | ClassScalarWhereInput[];
  };

  export type EntryUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?:
      | XOR<EntryCreateWithoutAuthorInput, EntryUncheckedCreateWithoutAuthorInput>
      | EntryCreateWithoutAuthorInput[]
      | EntryUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?:
      | EntryCreateOrConnectWithoutAuthorInput
      | EntryCreateOrConnectWithoutAuthorInput[];
    upsert?:
      | EntryUpsertWithWhereUniqueWithoutAuthorInput
      | EntryUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: EntryCreateManyAuthorInputEnvelope;
    set?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
    disconnect?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
    delete?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
    update?:
      | EntryUpdateWithWhereUniqueWithoutAuthorInput
      | EntryUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?:
      | EntryUpdateManyWithWhereWithoutAuthorInput
      | EntryUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: EntryScalarWhereInput | EntryScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutClassesInput = {
    create?: XOR<UserCreateWithoutClassesInput, UserUncheckedCreateWithoutClassesInput>;
    connectOrCreate?: UserCreateOrConnectWithoutClassesInput;
    connect?: UserWhereUniqueInput;
  };

  export type EntryCreateNestedManyWithoutClassInput = {
    create?:
      | XOR<EntryCreateWithoutClassInput, EntryUncheckedCreateWithoutClassInput>
      | EntryCreateWithoutClassInput[]
      | EntryUncheckedCreateWithoutClassInput[];
    connectOrCreate?:
      | EntryCreateOrConnectWithoutClassInput
      | EntryCreateOrConnectWithoutClassInput[];
    createMany?: EntryCreateManyClassInputEnvelope;
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
  };

  export type EntryUncheckedCreateNestedManyWithoutClassInput = {
    create?:
      | XOR<EntryCreateWithoutClassInput, EntryUncheckedCreateWithoutClassInput>
      | EntryCreateWithoutClassInput[]
      | EntryUncheckedCreateWithoutClassInput[];
    connectOrCreate?:
      | EntryCreateOrConnectWithoutClassInput
      | EntryCreateOrConnectWithoutClassInput[];
    createMany?: EntryCreateManyClassInputEnvelope;
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
  };

  export type UserUpdateOneRequiredWithoutClassesNestedInput = {
    create?: XOR<UserCreateWithoutClassesInput, UserUncheckedCreateWithoutClassesInput>;
    connectOrCreate?: UserCreateOrConnectWithoutClassesInput;
    upsert?: UserUpsertWithoutClassesInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<UserUpdateToOneWithWhereWithoutClassesInput, UserUpdateWithoutClassesInput>,
      UserUncheckedUpdateWithoutClassesInput
    >;
  };

  export type EntryUpdateManyWithoutClassNestedInput = {
    create?:
      | XOR<EntryCreateWithoutClassInput, EntryUncheckedCreateWithoutClassInput>
      | EntryCreateWithoutClassInput[]
      | EntryUncheckedCreateWithoutClassInput[];
    connectOrCreate?:
      | EntryCreateOrConnectWithoutClassInput
      | EntryCreateOrConnectWithoutClassInput[];
    upsert?:
      | EntryUpsertWithWhereUniqueWithoutClassInput
      | EntryUpsertWithWhereUniqueWithoutClassInput[];
    createMany?: EntryCreateManyClassInputEnvelope;
    set?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
    disconnect?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
    delete?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
    update?:
      | EntryUpdateWithWhereUniqueWithoutClassInput
      | EntryUpdateWithWhereUniqueWithoutClassInput[];
    updateMany?:
      | EntryUpdateManyWithWhereWithoutClassInput
      | EntryUpdateManyWithWhereWithoutClassInput[];
    deleteMany?: EntryScalarWhereInput | EntryScalarWhereInput[];
  };

  export type EntryUncheckedUpdateManyWithoutClassNestedInput = {
    create?:
      | XOR<EntryCreateWithoutClassInput, EntryUncheckedCreateWithoutClassInput>
      | EntryCreateWithoutClassInput[]
      | EntryUncheckedCreateWithoutClassInput[];
    connectOrCreate?:
      | EntryCreateOrConnectWithoutClassInput
      | EntryCreateOrConnectWithoutClassInput[];
    upsert?:
      | EntryUpsertWithWhereUniqueWithoutClassInput
      | EntryUpsertWithWhereUniqueWithoutClassInput[];
    createMany?: EntryCreateManyClassInputEnvelope;
    set?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
    disconnect?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
    delete?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
    connect?: EntryWhereUniqueInput | EntryWhereUniqueInput[];
    update?:
      | EntryUpdateWithWhereUniqueWithoutClassInput
      | EntryUpdateWithWhereUniqueWithoutClassInput[];
    updateMany?:
      | EntryUpdateManyWithWhereWithoutClassInput
      | EntryUpdateManyWithWhereWithoutClassInput[];
    deleteMany?: EntryScalarWhereInput | EntryScalarWhereInput[];
  };

  export type ClassCreateNestedOneWithoutEntriesInput = {
    create?: XOR<ClassCreateWithoutEntriesInput, ClassUncheckedCreateWithoutEntriesInput>;
    connectOrCreate?: ClassCreateOrConnectWithoutEntriesInput;
    connect?: ClassWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutEntriesInput = {
    create?: XOR<UserCreateWithoutEntriesInput, UserUncheckedCreateWithoutEntriesInput>;
    connectOrCreate?: UserCreateOrConnectWithoutEntriesInput;
    connect?: UserWhereUniqueInput;
  };

  export type ClassUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: XOR<ClassCreateWithoutEntriesInput, ClassUncheckedCreateWithoutEntriesInput>;
    connectOrCreate?: ClassCreateOrConnectWithoutEntriesInput;
    upsert?: ClassUpsertWithoutEntriesInput;
    connect?: ClassWhereUniqueInput;
    update?: XOR<
      XOR<ClassUpdateToOneWithWhereWithoutEntriesInput, ClassUpdateWithoutEntriesInput>,
      ClassUncheckedUpdateWithoutEntriesInput
    >;
  };

  export type UserUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: XOR<UserCreateWithoutEntriesInput, UserUncheckedCreateWithoutEntriesInput>;
    connectOrCreate?: UserCreateOrConnectWithoutEntriesInput;
    upsert?: UserUpsertWithoutEntriesInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<UserUpdateToOneWithWhereWithoutEntriesInput, UserUpdateWithoutEntriesInput>,
      UserUncheckedUpdateWithoutEntriesInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type ClassCreateWithoutAuthorInput = {
    id?: string;
    className: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entries?: EntryCreateNestedManyWithoutClassInput;
  };

  export type ClassUncheckedCreateWithoutAuthorInput = {
    id?: string;
    className: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entries?: EntryUncheckedCreateNestedManyWithoutClassInput;
  };

  export type ClassCreateOrConnectWithoutAuthorInput = {
    where: ClassWhereUniqueInput;
    create: XOR<ClassCreateWithoutAuthorInput, ClassUncheckedCreateWithoutAuthorInput>;
  };

  export type ClassCreateManyAuthorInputEnvelope = {
    data: ClassCreateManyAuthorInput | ClassCreateManyAuthorInput[];
    skipDuplicates?: boolean;
  };

  export type EntryCreateWithoutAuthorInput = {
    id?: string;
    horseName: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    class: ClassCreateNestedOneWithoutEntriesInput;
  };

  export type EntryUncheckedCreateWithoutAuthorInput = {
    id?: string;
    horseName: string;
    classId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EntryCreateOrConnectWithoutAuthorInput = {
    where: EntryWhereUniqueInput;
    create: XOR<EntryCreateWithoutAuthorInput, EntryUncheckedCreateWithoutAuthorInput>;
  };

  export type EntryCreateManyAuthorInputEnvelope = {
    data: EntryCreateManyAuthorInput | EntryCreateManyAuthorInput[];
    skipDuplicates?: boolean;
  };

  export type ClassUpsertWithWhereUniqueWithoutAuthorInput = {
    where: ClassWhereUniqueInput;
    update: XOR<ClassUpdateWithoutAuthorInput, ClassUncheckedUpdateWithoutAuthorInput>;
    create: XOR<ClassCreateWithoutAuthorInput, ClassUncheckedCreateWithoutAuthorInput>;
  };

  export type ClassUpdateWithWhereUniqueWithoutAuthorInput = {
    where: ClassWhereUniqueInput;
    data: XOR<ClassUpdateWithoutAuthorInput, ClassUncheckedUpdateWithoutAuthorInput>;
  };

  export type ClassUpdateManyWithWhereWithoutAuthorInput = {
    where: ClassScalarWhereInput;
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyWithoutAuthorInput>;
  };

  export type ClassScalarWhereInput = {
    AND?: ClassScalarWhereInput | ClassScalarWhereInput[];
    OR?: ClassScalarWhereInput[];
    NOT?: ClassScalarWhereInput | ClassScalarWhereInput[];
    id?: StringFilter<'Class'> | string;
    className?: StringFilter<'Class'> | string;
    authorId?: StringFilter<'Class'> | string;
    createdAt?: DateTimeFilter<'Class'> | Date | string;
    updatedAt?: DateTimeFilter<'Class'> | Date | string;
  };

  export type EntryUpsertWithWhereUniqueWithoutAuthorInput = {
    where: EntryWhereUniqueInput;
    update: XOR<EntryUpdateWithoutAuthorInput, EntryUncheckedUpdateWithoutAuthorInput>;
    create: XOR<EntryCreateWithoutAuthorInput, EntryUncheckedCreateWithoutAuthorInput>;
  };

  export type EntryUpdateWithWhereUniqueWithoutAuthorInput = {
    where: EntryWhereUniqueInput;
    data: XOR<EntryUpdateWithoutAuthorInput, EntryUncheckedUpdateWithoutAuthorInput>;
  };

  export type EntryUpdateManyWithWhereWithoutAuthorInput = {
    where: EntryScalarWhereInput;
    data: XOR<EntryUpdateManyMutationInput, EntryUncheckedUpdateManyWithoutAuthorInput>;
  };

  export type EntryScalarWhereInput = {
    AND?: EntryScalarWhereInput | EntryScalarWhereInput[];
    OR?: EntryScalarWhereInput[];
    NOT?: EntryScalarWhereInput | EntryScalarWhereInput[];
    id?: StringFilter<'Entry'> | string;
    horseName?: StringFilter<'Entry'> | string;
    classId?: StringFilter<'Entry'> | string;
    authorId?: StringFilter<'Entry'> | string;
    createdAt?: DateTimeFilter<'Entry'> | Date | string;
    updatedAt?: DateTimeFilter<'Entry'> | Date | string;
  };

  export type UserCreateWithoutClassesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entries?: EntryCreateNestedManyWithoutAuthorInput;
  };

  export type UserUncheckedCreateWithoutClassesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entries?: EntryUncheckedCreateNestedManyWithoutAuthorInput;
  };

  export type UserCreateOrConnectWithoutClassesInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutClassesInput, UserUncheckedCreateWithoutClassesInput>;
  };

  export type EntryCreateWithoutClassInput = {
    id?: string;
    horseName: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: UserCreateNestedOneWithoutEntriesInput;
  };

  export type EntryUncheckedCreateWithoutClassInput = {
    id?: string;
    horseName: string;
    authorId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EntryCreateOrConnectWithoutClassInput = {
    where: EntryWhereUniqueInput;
    create: XOR<EntryCreateWithoutClassInput, EntryUncheckedCreateWithoutClassInput>;
  };

  export type EntryCreateManyClassInputEnvelope = {
    data: EntryCreateManyClassInput | EntryCreateManyClassInput[];
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithoutClassesInput = {
    update: XOR<UserUpdateWithoutClassesInput, UserUncheckedUpdateWithoutClassesInput>;
    create: XOR<UserCreateWithoutClassesInput, UserUncheckedCreateWithoutClassesInput>;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutClassesInput = {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutClassesInput, UserUncheckedUpdateWithoutClassesInput>;
  };

  export type UserUpdateWithoutClassesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    entries?: EntryUpdateManyWithoutAuthorNestedInput;
  };

  export type UserUncheckedUpdateWithoutClassesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    entries?: EntryUncheckedUpdateManyWithoutAuthorNestedInput;
  };

  export type EntryUpsertWithWhereUniqueWithoutClassInput = {
    where: EntryWhereUniqueInput;
    update: XOR<EntryUpdateWithoutClassInput, EntryUncheckedUpdateWithoutClassInput>;
    create: XOR<EntryCreateWithoutClassInput, EntryUncheckedCreateWithoutClassInput>;
  };

  export type EntryUpdateWithWhereUniqueWithoutClassInput = {
    where: EntryWhereUniqueInput;
    data: XOR<EntryUpdateWithoutClassInput, EntryUncheckedUpdateWithoutClassInput>;
  };

  export type EntryUpdateManyWithWhereWithoutClassInput = {
    where: EntryScalarWhereInput;
    data: XOR<EntryUpdateManyMutationInput, EntryUncheckedUpdateManyWithoutClassInput>;
  };

  export type ClassCreateWithoutEntriesInput = {
    id?: string;
    className: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: UserCreateNestedOneWithoutClassesInput;
  };

  export type ClassUncheckedCreateWithoutEntriesInput = {
    id?: string;
    className: string;
    authorId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ClassCreateOrConnectWithoutEntriesInput = {
    where: ClassWhereUniqueInput;
    create: XOR<ClassCreateWithoutEntriesInput, ClassUncheckedCreateWithoutEntriesInput>;
  };

  export type UserCreateWithoutEntriesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classes?: ClassCreateNestedManyWithoutAuthorInput;
  };

  export type UserUncheckedCreateWithoutEntriesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classes?: ClassUncheckedCreateNestedManyWithoutAuthorInput;
  };

  export type UserCreateOrConnectWithoutEntriesInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutEntriesInput, UserUncheckedCreateWithoutEntriesInput>;
  };

  export type ClassUpsertWithoutEntriesInput = {
    update: XOR<ClassUpdateWithoutEntriesInput, ClassUncheckedUpdateWithoutEntriesInput>;
    create: XOR<ClassCreateWithoutEntriesInput, ClassUncheckedCreateWithoutEntriesInput>;
    where?: ClassWhereInput;
  };

  export type ClassUpdateToOneWithWhereWithoutEntriesInput = {
    where?: ClassWhereInput;
    data: XOR<ClassUpdateWithoutEntriesInput, ClassUncheckedUpdateWithoutEntriesInput>;
  };

  export type ClassUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    className?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    author?: UserUpdateOneRequiredWithoutClassesNestedInput;
  };

  export type ClassUncheckedUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    className?: StringFieldUpdateOperationsInput | string;
    authorId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUpsertWithoutEntriesInput = {
    update: XOR<UserUpdateWithoutEntriesInput, UserUncheckedUpdateWithoutEntriesInput>;
    create: XOR<UserCreateWithoutEntriesInput, UserUncheckedCreateWithoutEntriesInput>;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutEntriesInput = {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutEntriesInput, UserUncheckedUpdateWithoutEntriesInput>;
  };

  export type UserUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    classes?: ClassUpdateManyWithoutAuthorNestedInput;
  };

  export type UserUncheckedUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    passwordHash?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    classes?: ClassUncheckedUpdateManyWithoutAuthorNestedInput;
  };

  export type ClassCreateManyAuthorInput = {
    id?: string;
    className: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EntryCreateManyAuthorInput = {
    id?: string;
    horseName: string;
    classId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ClassUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    className?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    entries?: EntryUpdateManyWithoutClassNestedInput;
  };

  export type ClassUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    className?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    entries?: EntryUncheckedUpdateManyWithoutClassNestedInput;
  };

  export type ClassUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    className?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EntryUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    horseName?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    class?: ClassUpdateOneRequiredWithoutEntriesNestedInput;
  };

  export type EntryUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    horseName?: StringFieldUpdateOperationsInput | string;
    classId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EntryUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    horseName?: StringFieldUpdateOperationsInput | string;
    classId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EntryCreateManyClassInput = {
    id?: string;
    horseName: string;
    authorId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EntryUpdateWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string;
    horseName?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    author?: UserUpdateOneRequiredWithoutEntriesNestedInput;
  };

  export type EntryUncheckedUpdateWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string;
    horseName?: StringFieldUpdateOperationsInput | string;
    authorId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EntryUncheckedUpdateManyWithoutClassInput = {
    id?: StringFieldUpdateOperationsInput | string;
    horseName?: StringFieldUpdateOperationsInput | string;
    authorId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
