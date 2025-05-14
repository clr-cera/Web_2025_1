import Banner from "@/app/components/Banner";
import CategorySelector from "@/app/components/CategorySelector";
import FeatureElements from "@/app/components/FeatureElements";

export default function Home() {
  return (
    <div className="text-black">
        <Banner />
        <CategorySelector />
        <FeatureElements />
    </div>
  );
}
