import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useCountryContext } from '../../context/CountryInfo';
import { useEffect, useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const { setSearchQuery, filteredCountryData } = useCountryContext();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const filteredData = filteredCountryData?.filter((country) =>
      country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchQuery(searchValue);
  }, [searchValue, setSearchQuery, filteredCountryData]);  

  const handleSearch = (event: any) => {
    const { value } = event.target;
    console.log('Search Query:', value);
    setSearchQuery(value);
    setSearchValue(value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "green", marginBottom: "30px" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            CountryInfo with Typescript
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearch}
            />
          </Search>
        </Toolbar>
      </AppBar>
      {filteredCountryData && (
        <div style={{ margin: "auto 20px" }}>
          <Grid container spacing={2}>
            {filteredCountryData.map((country, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card style={{ height: '50vh' }}>
                  <img src={country.flags.png} alt={`${country.name.common} flags`} style={{ objectFit: 'cover', width: '100%', height: '25vh' }} />
                  <CardContent>
                    <Link href={country.maps.googleMaps} style={{ textDecoration: 'none', fontSize: '22px' }} color="text.secondary" >
                      {country.name.common}
                    </Link>
                    <Typography variant="body2" color="text.secondary" style={{ marginTop: '20px' }}>
                      Capital: {country.capital}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Region: {country.region}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Population: {country.population}
                    </Typography>
                    {country.borders && country.borders.length > 0 && (
                      <Typography variant="body2" color="text.secondary">
                        Borders: {country.borders.join(', ')}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Box>
  );
}