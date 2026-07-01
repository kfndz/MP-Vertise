interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "text-center mb-16" : "mb-16"}>
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      {description && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
