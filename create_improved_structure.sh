#!/bin/bash
mkdir -p public/assets public/mockassets src/components/common src/components/layout src/components/home src/components/account src/components/admin src/components/cart src/components/product src/components/ui src/data src/hooks src/store src/types src/lib src/config app/(site)/about app/(site)/cart app/(site)/checkout app/(site)/contact app/(site)/product/[id] app/(site)/search app/(site)/shop app/(site)/wishlist app/(admin)/dashboard app/(admin)/orders app/(admin)/products app/account messages && \
touch public/assets/cmon.jpg public/assets/logo.png && \
touch public/mockassets/{1.jpg,2.jpg,3.jpg,4.jpg,5.jpg,6.jpg,7.jpg,8.jpg,9.jpg,10.jpg,11.jpg,12.jpg} && \
touch src/data/mockData.ts && \
touch src/config/i18n.ts && \
touch messages/{en.json,ar.json} && \
touch app/(site)/about/page.tsx app/(site)/cart/page.tsx app/(site)/checkout/page.tsx app/(site)/contact/page.tsx app/(site)/product/[id]/page.tsx app/(site)/search/page.tsx app/(site)/shop/page.tsx app/(site)/wishlist/page.tsx app/(site)/page.tsx app/(admin)/layout.tsx app/(admin)/dashboard/page.tsx app/(admin)/orders/page.tsx app/(admin)/products/page.tsx app/account/page.tsx app/layout.tsx && \
touch src/components/common/Footer.tsx src/components/common/Header.tsx src/components/common/MegaMenu.tsx src/components/common/ThemeToggle.tsx && \
touch src/components/layout/ClientLayout.tsx && \
touch src/components/home/CategorySection.tsx src/components/home/FeaturedSections.tsx src/components/home/Hero.tsx && \
touch src/components/account/AccountAddresses.tsx src/components/account/AccountOrders.tsx && \
touch src/components/admin/AdminLayout.tsx src/components/admin/AdminSidebar.tsx && \
touch src/components/cart/CartSidebar.tsx && \
touch src/components/product/ProductCard.tsx src/components/product/ProductListItem.tsx && \
touch src/hooks/use-mobile.ts src/store/useStore.ts src/types/index.ts src/lib/api.ts src/lib/utils.ts