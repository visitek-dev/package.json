import React, {useState} from 'react';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic';
import gql from 'graphql-tag';
import {openModal, closeModal} from '@redq/reuse-modal';
import ProductCard from 'components/ProductCard/ProductCard';
import {
    ProductsRow,
    ProductsCol,
    ButtonWrapper,
    LoaderWrapper,
    LoaderItem,
    ProductCardWrapper,
} from './Products.style';
import {CURRENCY} from 'helper/constant';
import {useQuery} from '@apollo/react-hooks';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Placeholder from 'components/Placeholder/Placeholder';
import Fade from 'react-reveal/Fade';
import NoResultFound from 'components/NoResult/NoResult';

const QuickView = dynamic(() => import('../QuickView/QuickView'));

const GET_PRODUCTS = gql`
  query getProducts(
    $type: String
    $searchText: String
    $category: String
    $offset: Int
    $limit: Int
  ) {
    products(
      type: $type
      searchText: $searchText
      category: $category
      offset: $offset
      limit: $limit
    ) {
     items {
        sku
        name
        description
        image
        type
        price
        unit
        salePrice
        discountInPercent
        gallery{
           url
        }
      }
      hasMore
    }
  }
`;

type ProductsProps = {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
    type: string;
    fetchLimit?: number;
    loadMore?: boolean;
};
export const Products: React.FC<ProductsProps> = ({
                                                      deviceType,
                                                      type,
                                                      fetchLimit = 8,
                                                      loadMore = true,
                                                  }) => {
    const router = useRouter();
    const [loadingMore, toggleLoading] = useState(false);
    const {data, error, loading, fetchMore} = useQuery(GET_PRODUCTS, {
        variables: {
            type: type,
            searchText: router.query.text,
            category: router.query.category,
            offset: 0,
            limit: fetchLimit,
        }
    });

    // Quick View Modal
    const handleModalClose = () => {
        const href = `${router.pathname}`;
        const as = '/';
        router.push(href, as, {shallow: true});
        closeModal();
    };
    const handleQuickViewModal = React.useCallback(
        (modalProps: any, deviceType: any, onModalClose: any) => {
            console.log(modalProps);
            if (router.pathname === '/product/[slug]') {
                const as = `/product/${modalProps.sku}`;
                router.push(router.pathname, as);
                return;
            }
            openModal({
                show: true,
                overlayClassName: 'quick-view-overlay',
                closeOnClickOutside: false,
                component: QuickView,
                componentProps: {modalProps, deviceType, onModalClose},
                closeComponent: 'div',
                config: {
                    enableResizing: false,
                    disableDragging: true,
                    className: 'quick-view-modal',
                    width: 900,
                    y: 30,
                    height: 'auto',
                    transition: {
                        mass: 1,
                        tension: 0,
                        friction: 0,
                    },
                },
            });
            const href = `${router.pathname}?${modalProps.sku}`;
            const as = `/product/${modalProps.sku}`;
            router.push(href, as, {shallow: true});
        },
        []
    );

    if (loading) {
        return (
            <LoaderWrapper>
                <LoaderItem>
                    <Placeholder/>
                </LoaderItem>
                <LoaderItem>
                    <Placeholder/>
                </LoaderItem>
                <LoaderItem>
                    <Placeholder/>
                </LoaderItem>
            </LoaderWrapper>
        );
    }

    if (error) return <div>{error.message}</div>;
    if (!data || !data.products || data.products.items.length === 0) {
        return <NoResultFound/>;
    }
    const handleLoadMore = () => {
        toggleLoading(true);
        fetchMore({
            variables: {
                offset: Number(data.products.items.length),
                limit: fetchLimit,
            },
            updateQuery: (prev, {fetchMoreResult}) => {
                toggleLoading(false);
                if (!fetchMoreResult) {
                    return prev;
                }
                return {
                    products: {
                        __typename: prev.products.__typename,
                        items: [...prev.products.items, ...fetchMoreResult.products.items],
                        hasMore: fetchMoreResult.products.hasMore,
                    },
                };
            },
        });
    };

    return (
        <>
            <ProductsRow>
                {data.products.items.map((item: any, index: number) => (
                    <ProductsCol key={index}>
                        <ProductCardWrapper>
                            <Fade
                                duration={800}
                                delay={index * 10}
                                style={{height: '100%'}}
                            >
                                <ProductCard
                                    title={item.name}
                                    description={item.description}
                                    image={item.image}
                                    weight={item.unit}
                                    currency={CURRENCY}
                                    price={item.price}
                                    salePrice={item.salePrice}
                                    discountInPercent={item.discountInPercent}
                                    data={item}
                                    deviceType={deviceType}
                                    onClick={() =>
                                        handleQuickViewModal(item, deviceType, handleModalClose)
                                    }
                                />
                            </Fade>
                        </ProductCardWrapper>
                    </ProductsCol>
                ))}
            </ProductsRow>
            {loadMore && data.products.hasMore && (
                <ButtonWrapper>
                    <Button
                        onClick={handleLoadMore}
                        title='Load More'
                        intlButtonId='loadMoreBtn'
                        size='small'
                        isLoading={loadingMore}
                        loader={<Loader color='#009E7F'/>}
                        style={{
                            minWidth: 135,
                            backgroundColor: '#ffffff',
                            border: '1px solid #f1f1f1',
                            color: '#009E7F',
                        }}
                    />
                </ButtonWrapper>
            )}
        </>
    );
};
export default Products;
