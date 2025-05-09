import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// POST request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  try {
    const cityName = req.body.cityName;

    // GET weather data from city name
    WeatherService.getWeatherForCity(cityName).then((data) => {
      HistoryService.addCity(cityName);
      res.json(data);
    });
  } catch (error) { // catch any errors
    res.status(500).json(error);
  }
});

// GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const savedCities = await HistoryService.getCities();
    res.json(savedCities);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
  }
});

// DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: 'City ID is required' });
    }
    await HistoryService.removeCity(req.params.id);
    res.json({ success: 'City has been removed from search history' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
