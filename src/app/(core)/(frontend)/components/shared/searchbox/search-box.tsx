import React, { useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

interface Position {
    lat: number;
    lon: number;
    display_name?: string;
    place_id?: string;
  }

interface SearchBoxProps {
  selectPosition: Position | null;
  setSelectPosition: React.Dispatch<React.SetStateAction<Position | null>>;
}

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox({ setSelectPosition }: SearchBoxProps) {
  const [searchText, setSearchText] = useState<string>("");
  const [listPlace, setListPlace] = useState<Position[]>([]);

  const handleSearch = () => {
    if (!searchText) return;

    // Construct search parameters for the API
    const params = {
      q: searchText,
      format: "json",
      addressdetails: "1",
      polygon_geojson: "0",
    };

    // URL encode the parameters
    const queryString = new URLSearchParams(params).toString();

    // Fetch data from the API
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        const places = data.map((item: any) => ({
          lat: parseFloat(item.lat), // Convert lat to number
          lon: parseFloat(item.lon), // Convert lon to number
          display_name: item.display_name,
          place_id: item.place_id,
        }));
        setListPlace(places); // Set the list of places to state
      })
      .catch((error) => {
        console.error("Error during search:", error);
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
            style={{ width: "100%" }}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
      <div>
        <List component="nav" aria-label="search results">
          {listPlace.map((item) => (
            <div key={item?.place_id}>
              <ListItem button onClick={() => setSelectPosition(item)}>
                <ListItemIcon>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Pin-location.png" alt="Placeholder" style={{ width: 38, height: 38 }} />
                </ListItemIcon>
                <ListItemText primary={item?.display_name} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}
