import { Button } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { Link } from "react-router-dom";

// Temporary mock categories with hardcoded image URLs
const categories = [
  {
    id: "1",
    name: "Bedding",
    slug: "bedding",
    image: "https://images.pexels.com/photos/1099816/pexels-photo-1099816.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "2",
    name: "Bath",
    slug: "bath",
    image: "https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "3",
    name: "Decor",
    slug: "decor",
    image: "https://images.pexels.com/photos/5996971/pexels-photo-5996971.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export default function CategorySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-[var(--card-bg-color)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-[var(--text-color)] mb-4">
            Explore each unique collection
          </h2>
          <div className="w-16 h-0.5 bg-[var(--primary-color)] mx-auto" data-testid="divider"></div>
        </div>

        <div className="relative">
          <Button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--card-bg-color)] shadow-md hover:bg-[var(--hover-bg-color)] rounded-full p-2"
            onClick={() => scroll("left")}
            aria-label="Scroll categories left"
          >
            <ChevronLeftIcon className="h-5 w-5 text-[var(--text-color)]" />
          </Button>

          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            aria-label="Category carousel"
          >
            <div className="flex justify-center gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/categories/${category.slug}`}
                  className="flex-shrink-0 group"
                >
                  <div className="w-48 text-center">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4 bg-[var(--sand-beige-50)] group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-[var(--text-color)] group-hover:text-[var(--secondary-500)] transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--card-bg-color)] shadow-md hover:bg-[var(--hover-bg-color)] rounded-full p-2"
            onClick={() => scroll("right")}
            aria-label="Scroll categories right"
          >
            <ChevronRightIcon className="h-5 w-5 text-[var(--text-color)]" />
          </Button>
        </div>
      </div>
    </section>
  );
}