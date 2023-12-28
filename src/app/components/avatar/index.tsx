export function Avatar({ firstName, lastName }: Readonly<{ firstName?: string; lastName?: string }>) {
  const generateBackground = (name: string): string => {
    let hash = 0;
    let i;

    for (i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    // name.charCodeAt() return an int between 0 and 65535
    // left shift (<<)  operator moves to left by number of specified
    // bites after <<. The whole for loop will create a color hash
    // based on username length
    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  return (
    <div
      style={{ backgroundColor: generateBackground(firstName ?? '' + lastName) }}
      className={`flex w-9 h-9  rounded-full text-text-dark dark:text-text`}
    >
      <span className="m-auto font-bold">{firstName?.[0] ?? '' + lastName?.[0]}</span>
    </div>
  );
}
