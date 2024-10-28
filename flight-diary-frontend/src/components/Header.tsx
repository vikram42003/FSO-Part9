interface HeaderProps {
  text: string;
}

const Header = ({ text }: HeaderProps) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};

export default Header;
