import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";

export default function AnimalImageListFarm({setAnimalSpecies}) {
  const handleClick = (title) => {
    setAnimalSpecies(title);
  };
  return (
    <div className="w-full p-28 pt-0 overflow-hidden">
      <ImageList
        sx={{
          width: "100%",
          height: 450,
          overflowY: "scroll", // Allows scrolling
          scrollbarWidth: "none", // Firefox-specific
          msOverflowStyle: "none", // IE and Edge
          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for Chrome, Safari, and Opera
        }}
      >
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">Farm</ListSubheader>
        </ImageListItem>
        {itemData.map((item) => (
          <ImageListItem key={item.img} onClick={()=>handleClick(item.title)}>
            <img

              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                ></IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

const itemData = [
  {
    img: "https://i.pinimg.com/236x/cd/29/9d/cd299db0a41a181b248ed757d92059d1.jpg",
    title: "Cow",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://i.pinimg.com/236x/d2/05/5b/d2055b284493daec0724ac2fb040737b.jpg",
    title: "Goat",
  },
  {
    img: "https://i.pinimg.com/736x/db/27/7c/db277cc1a604ddd998559b57c7392444.jpg",
    title: "Sheep",
  },
  {
    img: "https://i.pinimg.com/236x/28/d7/dc/28d7dc697c9a5dfc5095eaf042aed13a.jpg",
    title: "Pig",
    cols: 2,
  },
  {
    img: "https://i.pinimg.com/236x/4d/74/1c/4d741cc4e77530d5be94c51686ba809f.jpg",
    title: "Horse",
    cols: 2,
  },
  {
    img: "https://i.pinimg.com/236x/6b/6f/ba/6b6fba82e1ac16a3f0e6af8d1a956632.jpg",
    title: "Donkey",
    rows: 2,
    cols: 2,
    featured: true,
  },
];
