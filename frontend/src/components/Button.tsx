interface ButtonProps {
    label: string;
    variant?: "primary" | "secondary";
  }
  
  export default function Button({
    label,
    variant = "primary",
  }: ButtonProps) {
    const styles =
      variant === "primary"
        ? "bg-blue-600 text-white px-4 py-2 rounded"
        : "bg-gray-200 text-gray-700 px-4 py-2 rounded";
  
    return <button className={styles}>{label}</button>;
  }
  