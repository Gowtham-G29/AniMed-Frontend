import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";

export default function AnimalImageListPet({setAnimalSpecies}) {

  const handleClick = (title) => {
    setAnimalSpecies(title);
  };

  return (
    <div className="w-full p-28 pt-0 overflow-hidden">
      <ImageList
        sx={{
          width: "100%",
          height: 450,
          overflowY: "scroll", 
          scrollbarWidth: "none", 
          msOverflowStyle: "none", 
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">Pets</ListSubheader>
        </ImageListItem>
        {itemData.map((item) => (
          <ImageListItem key={item.img} onClick={() => handleClick(item.title)} style={{ cursor: "pointer" }}>
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
    img: "https://i.pinimg.com/236x/e6/a1/1f/e6a11ff2de8df0f2db3c45e146a9dba9.jpg",
    title: "Dog",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://i.pinimg.com/236x/a5/74/3d/a5743de123fef585efafb6cdc21cced5.jpg",
    title: "Cat",
  },
  {
    img: "https://i.pinimg.com/236x/02/60/fe/0260fe917e3160e3437c783c45dd21b5.jpg",
    title: "Bird",
  },
  {
    img: "https://i.pinimg.com/236x/13/6e/fd/136efdb8ef536767f62f3704cd5ff96c.jpg",
    title: "Hamsters",
    cols: 2,
  },
  {
    img: "https://i.pinimg.com/236x/7b/c9/0e/7bc90ed63e9edae9ec5874b98b99c4ae.jpg",
    title: "Reptiles",
    cols: 2,
  },
  {
    img: "https://i.pinimg.com/236x/b8/d1/07/b8d1074bd32928bdd7b2f8028a7e8867.jpg",
    title: "Snakes",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://i.pinimg.com/236x/8c/47/99/8c479992316cc206c8ea90d000fa240b.jpg",
    title: "Fish",
  },
];
