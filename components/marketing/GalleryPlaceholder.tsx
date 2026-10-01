import { Images } from "lucide-react";
import styles from "./marketing.module.css";

export default function GalleryPlaceholder() {
  return (
    <div className={styles.galleryPlaceholder}>
      <Images aria-hidden="true" />
      <h3>Video gallery coming soon</h3>
      <p>We&apos;re updating this section with new footage. Check back shortly.</p>
    </div>
  );
}
