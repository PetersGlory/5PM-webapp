function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className = '' }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

function CardTitle({ children, className = '' }) {
  return <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>;
}

function CardContent({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;

export default Card;
