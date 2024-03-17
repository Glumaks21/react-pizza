import React, { Suspense } from 'react';
import { Await, LoaderFunctionArgs, defer, useLoaderData, useNavigation } from 'react-router-dom';
import {
  Categories,
  Sort,
  Pagination,
  PizzaCard,
  PizzaCardSkeleton as Skeleton,
} from '../components';
import AppParamExtractor from '../util/AppParamExtractor';
import PizzasApi from '../api/PizzaApi';
import Pizza from '../api/types/Pizza';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const page = AppParamExtractor.extractPage(searchParams);
  const limit = AppParamExtractor.extractLimit(searchParams);
  const sort = AppParamExtractor.extractSort(searchParams);
  const order = AppParamExtractor.extractOrder(searchParams);
  const category = AppParamExtractor.extractCategory(searchParams);
  const search = AppParamExtractor.extractSearch(searchParams);

  const paginationProps = { page, limit, sortBy: sort, order };
  const filterProps = { title: search, category };

  const pizzas = PizzasApi.getAll(paginationProps, filterProps);
  return defer({ pizzas, pageTotalCount: 3 });
}

export default function Home() {
  const { pizzas, pageTotalCount } = useLoaderData() as {
    pizzas: Promise<Pizza[]>;
    pageTotalCount: number;
  };
  const navigation = useNavigation();

  return (
    <main className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      {navigation.state === 'loading' ? (
        <SkeletonCardList />
      ) : (
        <Suspense fallback={<SkeletonCardList />}>
          <Await resolve={pizzas}>
            {(resolvedPizzas) => (
              <>
                <CardList pizzas={resolvedPizzas} />
                <Pagination totalPages={pageTotalCount} />
              </>
            )}
          </Await>
        </Suspense>
      )}
    </main>
  );
}

function SkeletonCardList() {
  return (
    <ul className="content__items">
      {[...new Array(8)].map((_, i) => (
        <li key={i}>
          <Skeleton />
        </li>
      ))}
    </ul>
  );
}

function CardList({ pizzas }: { pizzas: Pizza[] }) {
  return (
    <ul className="content__items">
      {pizzas.map((p) => (
        <li key={p.id}>
          <PizzaCard {...p} />
        </li>
      ))}
    </ul>
  );
}
