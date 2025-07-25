import { Button } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { categories } from "../../data/mockData";
import { Link } from "react-router-dom";

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
          <div className="w-16 h-0.5 bg-[var(--primary-color)] mx-auto"></div>
        </div>

        <div className="relative">
          <Button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--card-bg-color)] shadow-md hover:bg-[var(--hover-bg-color)]"
            onClick={() => scroll("left")}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="flex-shrink-0 group"
              >
                <div className="w-48 text-center">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4 bg-[var(--sand-beige-50)] group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="object-cover p-8 w-full h-full"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-[var(--text-color)] group-hover:text-[var(--gold-accent-500)] transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <Button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--card-bg-color)] shadow-md hover:bg-[var(--hover-bg-color)]"
            onClick={() => scroll("right")}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}